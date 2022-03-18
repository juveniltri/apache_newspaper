ESX = nil
intothepc = true
local pcredaccion = {
    {name="pc", x=733.84, y=2583.79, z=75.53-0.9},
    {name="pc", x=716.61, y=2526.89, z=73.51-0.9}
}

Citizen.CreateThread(function()
    while ESX == nil do
      TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
      Citizen.Wait(0)
    end

    ESX.PlayerData = ESX.GetPlayerData()
end)

RegisterNUICallback('NUIFocusOff', function(data, cb)
    SetNuiFocus(false, false)
    SendNUIMessage({
        type = 'closeAll',
        status = false,
    })
    intothepc = true
    cb('ok')
end)

RegisterNUICallback('PostNoti', function(data, cb)
    SetNuiFocus(false, false)
    SendNUIMessage({
        type = 'closeAll',
        status = false,
    })
    intothepc = true

    TriggerServerEvent("PostNoti", data)
    cb('ok')
end)

RegisterNUICallback('PostAd', function(data, cb)
    SetNuiFocus(false, false)
    SendNUIMessage({
        type = 'closeAll',
        status = false,
    })
    intothepc = true

    TriggerServerEvent("PostAd", data)
    cb('ok')
end)

RegisterNUICallback('DeleteNoti', function(data, cb)
    SetNuiFocus(false, false)
    SendNUIMessage({
        type = 'closeAll',
        status = false,
    })
    intothepc = true

    TriggerServerEvent("DeleteNoti", data)
    cb('ok')
end)

RegisterNUICallback('DeleteAd', function(data, cb)
    SetNuiFocus(false, false)
    SendNUIMessage({
        type = 'closeAll',
        status = false,
    })
    intothepc = true

    TriggerServerEvent("DeleteAd", data)
    cb('ok')
end)

RegisterNetEvent('apache_newspaper:openpaper')
AddEventHandler('apache_newspaper:openpaper', function()
    ESX.TriggerServerCallback('apache_newspaper:getpaper', function(notis, ads, publi)
        TriggerServerEvent("showlogs", ads)
        SetNuiFocus(true, true)
        SendNUIMessage({
            type = 'periodico',
            status = true,
            notis = notis,
            ads = ads,
            publi = publi
        })
        intothepc = false
    end)
end)

RegisterNUICallback('ChangeToNewsPaper', function(data, cb)
    SetNuiFocus(false, false)
    SendNUIMessage({
        type = 'closeAll',
        status = false,
    })
    intothepc = true
    ESX.TriggerServerCallback('apache_newspaper:getpaper', function(notis, ads, publi)
        TriggerServerEvent("showlogs", ads)
        SetNuiFocus(true, true)
        SendNUIMessage({
            type = 'periodico',
            status = true,
            notis = notis,
            ads = ads,
            publi = publi
        })
        intothepc = false
    end)
end)

--===============================================
--==          Distancia de la redaccion        ==
--===============================================
Citizen.CreateThread(function()
    while true do
        Wait(0)
        if InRebelRadio() then--and ESX.PlayerData and ESX.PlayerData.job.name == 'rradio' and ESX.PlayerData.job.grade_name == 'boss' then
            DisplayHelpText("Presione ~INPUT_PICKUP~ para acceder a la redaccion ~b~")
        
            if IsControlJustPressed(1, 38) then
                ESX.TriggerServerCallback('apache_newspaper:getpaper', function(notis, ads, publi)
                    SetNuiFocus(true, true)
                    SendNUIMessage({
                        type = "oficina",
                        status = true,
                        notis = notis,
                        ads = ads,
                        publi = publi
                    })
                    intothepc = false
                end)
            end
        end
    end
end)

function InRebelRadio()
    local player = GetPlayerPed(-1)
    local playerloc = GetEntityCoords(player, 0)

    for _, search in pairs(pcredaccion) do

        local distance = GetDistanceBetweenCoords(search.x, search.y, search.z, playerloc['x'], playerloc['y'], playerloc['z'], true)
        if distance <= 2 then
            return true
        end
    end
end

function DisplayHelpText(str)
    if intothepc then
        SetTextComponentFormat("STRING")
        AddTextComponentString(str)
        DisplayHelpTextFromStringLabel(0, 0, 1, -1)
    end
end