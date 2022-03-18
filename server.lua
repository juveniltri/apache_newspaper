ESX              = nil

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

RegisterServerEvent('PostNoti')
AddEventHandler('PostNoti', function(data)
    local _source = source
    local xPlayer = ESX.GetPlayerFromId(_source)
    MySQL.Async.execute("INSERT INTO apache_newspaper_noticias (title, reportero, comment, img, tiponoti) VALUES (@title, @reportero, @comment, @img, @tipo)",
                    {
                        ["@title"] = data.title,
                        ["@reportero"] = xPlayer.getName(),
                        ["@comment"] = data.comment,
                        ["@img"] = data.image,
                        ["@tipo"] = data.tipo
                    }, function (result)
    end)
end)

RegisterServerEvent('DeleteNoti')
AddEventHandler('DeleteNoti', function(data)
    local _source = source
    local xPlayer = ESX.GetPlayerFromId(_source)
    MySQL.Async.execute("DELETE FROM apache_newspaper_noticias WHERE id = @iddelete",
                    {
                        ["@iddelete"] = data.delID
                    }, function (result)
    end)
end)

RegisterServerEvent('DeleteAd')
AddEventHandler('DeleteAd', function(data)
    local _source = source
    local xPlayer = ESX.GetPlayerFromId(_source)
    MySQL.Async.execute("DELETE FROM apache_newspaper_ads WHERE id = @iddelete",
                    {
                        ["@iddelete"] = data.delID
                    }, function (result)
    end)
end)

RegisterServerEvent('PostAd')
AddEventHandler('PostAd', function(data)
    MySQL.Async.execute("INSERT INTO apache_newspaper_ads (title, img, finaldate, priority) VALUES (@title, @img, @finaldate, @priority)",
                    {
                        ["@title"] = data.title,
                        ["@img"] = data.image,
                        ["@finaldate"] = data.finaldate,
                        ["@priority"] = data.priority
                    }, function (result)
    end)
end)

ESX.RegisterServerCallback('apache_newspaper:getpaper', function(source, cb)
    local matches = {}
    local matches1 = {}
    local matches2 = {}
    MySQL.Async.fetchAll('SELECT * FROM apache_newspaper_noticias WHERE tiponoti != "REPORTAJES" ORDER BY dateadded DESC LIMIT 20', {},
    function (notis)
        for index, data in ipairs(notis) do
            title = data.title
            reportero = data.reportero
            comment = data.comment
            img = data.img
            tiponoti = data.tiponoti
            table.insert(matches, data)
        end
        MySQL.Async.fetchAll('SELECT * FROM apache_newspaper_ads WHERE finaldate > @finaldate ORDER BY priority desc', {
            ["@finaldate"] = os.date("%Y/%m/%d %X")
            }, function(ads)
                for index, data2 in ipairs(ads) do
                    info = data2.info
                    img = data2.img
                    table.insert(matches1, data2)
                end
                MySQL.Async.fetchAll('SELECT * FROM apache_newspaper_noticias WHERE tiponoti = "REPORTAJES" ORDER BY dateadded DESC LIMIT 5', {},
                    function (publi)
                        for index, data3 in ipairs(publi) do
                            title = data3.title
                            reportero = data3.reportero
                            comment = data3.comment
                            img = data3.img
                            tiponoti = data3.tiponoti
                            table.insert(matches2, data3)
                        end
                        matches = json.encode(matches)
                        matches1 = json.encode(matches1)
                        matches2 = json.encode(matches2)
                        cb(matches,matches1,matches2)
                    end)
        end)
    end)
end)


ESX.RegisterUsableItem('newspaper', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)
    
    TriggerClientEvent('apache_newspaper:openpaper', source)
end)
