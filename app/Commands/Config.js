'use strict'

const { Command } = require('@adonisjs/ace')

const Database = use('Database')

class Config extends Command {

    static get signature() {
        return `config`;
    }

    static get description() {
        return 'Configura los parametros del servidor';
    }

    async handle(args, options) {
        let choiceValue = await this.choice('Planificador', [{ name: 'Habilitar', value: 'true' }, { name: 'Deshabilitar', value: 'false' }]);
        choiceValue = (choiceValue == 'true');

        let count = await Database.table('schedulers').where('name', 'scheduler').getCount();

        if (count == 0) {
            this.error('No hay planificadores en la base de datos');
        } else {
            await Database.table('schedulers').where('name', 'scheduler').update({ active: choiceValue });
            this.success('Configuración guardada correctamente.');
        }

        await Database.close();
    }
}

module.exports = Config
