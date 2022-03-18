fx_version 'adamant'
games { 'rdr3', 'gta5' }

ui_page "nui/index.html"

files {
    "nui/index.html",
    "nui/assets/scripts/*.js",
    "nui/assets/style/*.css",
    "nui/assets/style/components/*.css",
    "nui/assets/style/components/*.css",
    "nui/assets/style/font-awesome/css/*.css",
    "nui/assets/style/font-awesome/js/*.js"
}

client_script {
	'client.lua',
  'cam_c.lua'
}

server_script {
  '@mysql-async/lib/MySQL.lua',
  'server.lua',
  'cam_s.lua'
}