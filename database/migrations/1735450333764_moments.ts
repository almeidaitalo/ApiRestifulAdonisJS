import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Moments extends BaseSchema {
  protected tableName = 'moments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.string('description')
      table.string('image')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
