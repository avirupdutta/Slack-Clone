import * as Sequelize from "sequelize";

import { getNewId } from "./common";

export const TeamFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<TeamInstance, TeamAttributes> => {
  const attributes: SequelizeAttributes<TeamAttributes> = {
    id: {
      type: DataTypes.STRING,
      defaultValue: getNewId,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    brief_description: {
      type: DataTypes.STRING,
      defaultValue: "",
      validate: {
        len: {
          args: [0, 127],
          msg: "The length cannot be longer than 128 characters"
        }
      }
    }
  };
  const Team = sequelize.define<TeamInstance, TeamAttributes>(
    "team",
    attributes
  );

  Team.associate = models => {
    Team.belongsToMany(models.User, {
      through: models.TeamMember,
      foreignKey: {
        name: "team_id",
        field: "team_id"
      }
    });
  };

  return Team;
};
