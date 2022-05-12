'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const DataTypes = require('sequelize/lib/data-types');
    queryInterface.addColumn('channels', 'created_by', { type: DataTypes.STRING });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn('channels', 'created_by');
  }
};
