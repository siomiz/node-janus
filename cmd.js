var fs = require('fs');
var yaml = require('js-yaml');

var CONFIG_FILE = 'config/default.yml';

var config = yaml.load(fs.readFileSync(CONFIG_FILE, 'utf8'));

config.logging.console.level = 'info';

config.proxy.tunnelSsl = true;

if('REDIS_PORT_6379_TCP_ADDR' in process.env){
  config.cache.enabled = true;
  config.cache.type = 'redis';
  config.cache.database.host = process.env.REDIS_PORT_6379_TCP_ADDR;
  config.cache.database.port = parseInt(process.env.REDIS_PORT_6379_TCP_PORT);
}else{
  config.cache.enabled = false;
}

fs.writeFileSync(CONFIG_FILE, yaml.dump(config))

require('/opt/node-janus/lib/index.js');

