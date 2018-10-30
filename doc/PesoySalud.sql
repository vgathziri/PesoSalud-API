CREATE TABLE Appointment (
  ID        int(10) NOT NULL AUTO_INCREMENT,
  UserID    int(10) NOT NULL,
  ServiceID int(10) NOT NULL,
  PlaceID   int(10) NOT NULL,
  `Date`    datetime NOT NULL,
  Status    varchar(255) NOT NULL,
  PRIMARY KEY (ID));
CREATE TABLE Diets (
  ID          int(10) NOT NULL AUTO_INCREMENT,
  Name        varchar(20) NOT NULL,
  Description varchar(255) NOT NULL,
  Active      tinyint(1) DEFAULT 1 NOT NULL,
  PRIMARY KEY (ID));
CREATE TABLE MedicalRecords (
  ID                   int(10) NOT NULL AUTO_INCREMENT,
  UserID               int(10) NOT NULL,
  AppointmentID        int(10) NOT NULL,
  ServiceID            int(10) NOT NULL,
  Weight               varchar(50),
  Bust                 decimal(10, 2),
  Waist                decimal(10, 2),
  Waistline            decimal(10, 2),
  Hip                  decimal(10, 2),
  Chest                decimal(10, 2),
  Abdomen              decimal(10, 2),
  DietID               int(10),
  Symptom              varchar(1000),
  Comments             varchar(1000),
  InitialHighAbdomen   decimal(10, 2),
  FinalHighAbdomen     decimal(10, 2),
  InitialMediumAbdomen decimal(10, 2),
  FinalMediumAbdomen   decimal(10, 2),
  InitialLowAbdomen    decimal(10, 2),
  FinalLowAbdomen      decimal(10, 2),
  PRIMARY KEY (ID));
CREATE TABLE Permission (
  ID          int(10) NOT NULL AUTO_INCREMENT,
  Route       varchar(255) NOT NULL,
  Method      varchar(255) NOT NULL,
  Active      tinyint(1) DEFAULT 1 NOT NULL,
  PRIMARY KEY (ID));
CREATE TABLE Places (
  ID        int(10) NOT NULL AUTO_INCREMENT,
  Name      varchar(255) NOT NULL,
  PlaceType varchar(255) NOT NULL,
  Active    tinyint(1) DEFAULT 1 NOT NULL,
  PRIMARY KEY (ID));
CREATE TABLE Promotions (
  ID             int(10) NOT NULL AUTO_INCREMENT,
  ServiceID      int(10) NOT NULL,
  Description    varchar(255) NOT NULL,
  Quantity       int(10) NOT NULL,
  Active         tinyint(1) DEFAULT 1 NOT NULL,
  PRIMARY KEY (ID));
CREATE TABLE PromotionsUser(
  PromotionID    int(10),
  UserId         int(10),
  `Date`         datetime NOT NULL,
  QuantityUsed   int(10) NOT NULL
);
CREATE TABLE Roles (
  ID          int(10) NOT NULL AUTO_INCREMENT,
  Description varchar(255) NOT NULL,
  Active      tinyint(1) DEFAULT 1 NOT NULL,
  PRIMARY KEY (ID));
CREATE TABLE Roles_Permission (
  RolesID      int(10) NOT NULL,
  PermissionID int(10) NOT NULL,
  PRIMARY KEY (RolesID,
  PermissionID));
CREATE TABLE Schedule (
  ID        int(10) NOT NULL AUTO_INCREMENT,
  WeekDay   tinyint(1) NOT NULL,
  StartTime time NOT NULL,
  EndTime   time NOT NULL,
  Active    tinyint(1) DEFAULT 1 NOT NULL,
  PRIMARY KEY (ID));
CREATE TABLE Services (
  ID          int(10) NOT NULL AUTO_INCREMENT,
  Name        varchar(255) NOT NULL,
  Description varchar(1000) NOT NULL,
  Price       decimal(7, 2) NOT NULL,
  Duration    int(10) NOT NULL,
  Active      tinyint(1) DEFAULT 1 NOT NULL,
  PRIMARY KEY (ID));
CREATE TABLE Services_Places (
  ServicesID int(10) NOT NULL,
  PlaceID    int(10) NOT NULL,
  PRIMARY KEY (ServicesID,
  PlaceID));
CREATE TABLE Tokens (
  Token       varchar(255) NOT NULL,
  UserID      int(10) NOT NULL,
  Created_at  datetime NOT NULL,
  Expires     int(10) NOT NULL,
  TypeToken   char(5) NOT NULL,
  Active      tinyint(1) DEFAULT 1 NOT NULL,
  PRIMARY KEY (Token));
CREATE TABLE Users (
  ID             int(10) NOT NULL AUTO_INCREMENT,
  Email          varchar(255) NOT NULL,
  Password       varchar(255) NOT NULL,
  Name           varchar(255) NOT NULL,
  Gender         char(1) NOT NULL,
  Phone          varchar(20),
  BirthDate      varchar(255),
  RegisteredDate varchar(255),
  Height         varchar(10),
  UserType       int(10) NOT NULL,
  Comments       varchar(1000),
  Picture        varchar(255),
  PRIMARY KEY (ID));
ALTER TABLE Tokens ADD INDEX FKTokens513099 (UserID), ADD CONSTRAINT FKTokens513099 FOREIGN KEY (UserID) REFERENCES Users (ID);
ALTER TABLE Users ADD INDEX FKUsers649923 (UserType), ADD CONSTRAINT FKUsers649923 FOREIGN KEY (UserType) REFERENCES Roles (ID);
ALTER TABLE Roles_Permission ADD INDEX FKRoles_Perm807637 (PermissionID), ADD CONSTRAINT FKRoles_Perm807637 FOREIGN KEY (PermissionID) REFERENCES Permission (ID);
ALTER TABLE Roles_Permission ADD INDEX FKRoles_Perm245097 (RolesID), ADD CONSTRAINT FKRoles_Perm245097 FOREIGN KEY (RolesID) REFERENCES Roles (ID);
ALTER TABLE PromotionsUser ADD INDEX FKPromotionsUser550782 (UserID), ADD CONSTRAINT FKPromotionsUsers550782 FOREIGN KEY (UserID) REFERENCES Users (ID);
ALTER TABLE PromotionsUser ADD INDEX FKPromotionsUser550782 (PromotionID), ADD CONSTRAINT FKPromotionsUsers550783 FOREIGN KEY (PromotionID) REFERENCES Promotions (ID);
ALTER TABLE Promotions ADD INDEX FKPromotions357747 (ServiceID), ADD CONSTRAINT FKPromotions357747 FOREIGN KEY (ServiceID) REFERENCES Services (ID);
ALTER TABLE Appointment ADD INDEX FKAppointmen602706 (PlaceID), ADD CONSTRAINT FKAppointmen602706 FOREIGN KEY (PlaceID) REFERENCES Places (ID);
ALTER TABLE Services_Places ADD INDEX FKServices_P171158 (PlaceID), ADD CONSTRAINT FKServices_P171158 FOREIGN KEY (PlaceID) REFERENCES Places (ID);
ALTER TABLE Services_Places ADD INDEX FKServices_P882206 (ServicesID), ADD CONSTRAINT FKServices_P882206 FOREIGN KEY (ServicesID) REFERENCES Services (ID);
ALTER TABLE MedicalRecords ADD INDEX FKMedicalRec452228 (DietID), ADD CONSTRAINT FKMedicalRec452228 FOREIGN KEY (DietID) REFERENCES Diets (ID);
ALTER TABLE MedicalRecords ADD INDEX FKMedicalRec718191 (ServiceID), ADD CONSTRAINT FKMedicalRec718191 FOREIGN KEY (ServiceID) REFERENCES Services (ID);
ALTER TABLE MedicalRecords ADD INDEX FKMedicalRec179753 (AppointmentID), ADD CONSTRAINT FKMedicalRec179753 FOREIGN KEY (AppointmentID) REFERENCES Appointment (ID);
ALTER TABLE Appointment ADD INDEX FKAppointmen456648 (ServiceID), ADD CONSTRAINT FKAppointmen456648 FOREIGN KEY (ServiceID) REFERENCES Services (ID);
ALTER TABLE MedicalRecords ADD INDEX FKMedicalRec525156 (UserID), ADD CONSTRAINT FKMedicalRec525156 FOREIGN KEY (UserID) REFERENCES Users (ID);
ALTER TABLE Appointment ADD INDEX FKAppointmen263613 (UserID), ADD CONSTRAINT FKAppointmen263613 FOREIGN KEY (UserID) REFERENCES Users (ID);

INSERT INTO Roles(Description)
VALUES
  ('Admin'),
  ('Doctora'),
  ('Recepcionista'),
  ('Paciente');

INSERT INTO Users(
  Email,
  Password,
  Name,
  Gender,
  Phone,
  BirthDate,
  RegisteredDate,
  Height,
  UserType,
  Comments
)
VALUES
  ('ceoe1996@hotmail.com', '1234', 'Carlos Orozco', 'M', '3334644819', '19960218', '20180926', '1.85', 1, ''),
  ('jacobnugo@gmail.com', '1234', 'Jacob Nuño', 'M', '3334623845', '19971222', '20181003', '1.70', 1, '');

INSERT INTO Services(
  Name,
  Description,
  Price,
  Duration
)
VALUES
  ('Control de Peso', 'Consulta de Control de peso con Acupuntura', '100', 5),
  ('Consulta Homeopatica', 'Consulta de Enfermeda dcon Homeopatia', '80', 10);

INSERT INTO Diets(
  Name,
  Description
)
VALUES
  ('A1', 'Desayuno Yogurth con Fruta'),
  ('A2', 'Cena Cereal con Fruta');

INSERT INTO Schedule(
  WeekDay,
  StartTime,
  EndTime
)
VALUES
  ('2', '10:00', '13:00'),
  ('2', '18:30', '20:30');

INSERT INTO Places(
  Name,
  PlaceType
)
VALUES
  ('Consultorio', 'Consultorio'),
  ('Cabina 1', 'Cabina');

INSERT INTO Services_Places(
  ServicesID,
  PlaceID
)
VALUES
  (1, 1),
  (1, 2);

INSERT INTO Promotions(
  ServiceID,
  Description,
  Quantity
)
VALUES
  (1, 'Paga 8 Consultas y Obten 10', 10);

INSERT INTO PromotionsUser(
  UserID,
  PromotionID,
  Date,
  QuantityUsed
)
VALUES
  (1, 1, '20181002', 0);

INSERT INTO Appointment(
  UserID,
  ServiceID,
  PlaceID,
  Date,
  Status
)
VALUES
  (1, 1, 1, '20181005', 'Scheduled');

INSERT INTO MedicalRecords(
  UserID,
  AppointmentID,
  ServiceID,
  Weight,
  Hip,
  Chest,
  Abdomen,
  DietID
)
VALUES
  (1, 1, 1, 89, 80.2, 76.9, 81.3, 1);
