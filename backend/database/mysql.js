import { Sequelize, Model, DataTypes } from "sequelize";

//TODO use env
const sequelize = new Sequelize("mysql", "admin", "admin", {
  host: "localhost",
  dialect: "mysql",
});

const CompanyDetails = sequelize.define("CompanyDetails", {
  // can use uuid
  // id: {
  //   type: DataTypes.UUID,
  //   defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
  //   primaryKey: true,
  // },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cin: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure unique CIN
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, // Now not nullable
  },
  pin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  directors: {
    type: DataTypes.JSON, // Store directors as JSON
  },
});

// Force sync (create table if it doesn't exist)
CompanyDetails.sync().then(() => {
  console.log("CompanyDetails table created (if necessary)");
});

export { CompanyDetails };
