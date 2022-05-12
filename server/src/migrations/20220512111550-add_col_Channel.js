'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const DataTypes = require('sequelize/lib/data-types');
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addColumn('channels', 'message_recipient_userId', { type: DataTypes.STRING });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn('channels', 'message_recipient_userId');
  }
};
