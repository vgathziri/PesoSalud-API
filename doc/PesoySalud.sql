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
  Descripcion varchar(255) NOT NULL, 
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
CREATE TABLE Places (
  ID        int(10) NOT NULL AUTO_INCREMENT, 
  Name      varchar(255) NOT NULL, 
  PlaceType varchar(255) NOT NULL, 
  Active    tinyint(1) DEFAULT 1 NOT NULL, 
  PRIMARY KEY (ID));
CREATE TABLE Promotions (
  ID             int(10) NOT NULL AUTO_INCREMENT, 
  UserID         int(10) NOT NULL, 
  ServiceID      int(10) NOT NULL, 
  `Date`         datetime NOT NULL, 
  QuantityBought int(10) NOT NULL, 
  QuantityUsed   int(10) NOT NULL, 
  PRIMARY KEY (ID));
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
  UserType       varchar(255) NOT NULL, 
  Comments       varchar(1000), 
  PRIMARY KEY (ID));
ALTER TABLE Promotions ADD INDEX FKPromotions550782 (UserID), ADD CONSTRAINT FKPromotions550782 FOREIGN KEY (UserID) REFERENCES Users (ID);
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
