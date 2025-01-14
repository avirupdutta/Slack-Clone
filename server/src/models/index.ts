import * as Sequelize from "sequelize";
import sequelizeConfig from "../config/sequelizeConfig";
import { ChannelFactory } from "./Channel";
import { ChannelMemberFactory } from "./ChannelMember";
import { MessageFactory } from "./Message";
import { TeamFactory } from "./Team";
import { TeamMemberFactory } from "./TeamMember";
import { UserFactory } from "./User";


const createModels = (sequelizeConfig): DbInterface => {
  const { database, username, password, params } = sequelizeConfig;
  const sequelize = new Sequelize(database, username, password, params);

  const models: DbInterface = {
    sequelize,
    Sequelize,
    Team: TeamFactory(sequelize, Sequelize),
    User: UserFactory(sequelize, Sequelize),
    Channel: ChannelFactory(sequelize, Sequelize),
    Message: MessageFactory(sequelize, Sequelize),
    TeamMember: TeamMemberFactory(sequelize, Sequelize),
    ChannelMember: ChannelMemberFactory(sequelize, Sequelize)
  };

  Object.keys(models).forEach(modelName => {
    if ("associate" in models[modelName]) {
      models[modelName].associate(models);
    }
  });
  return models;
};

const models = createModels(sequelizeConfig);
export default models;
