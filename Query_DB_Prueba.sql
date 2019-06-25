CREATE DATABASE Clientesbanco

USE Clientesbanco


CREATE TABLE [user]( 
	[Identificacion] [varchar](50) NOT NULL, 
	[Nombres] [nvarchar](max) NULL, 
	[FechaNacimiento] [varchar](50) NULL, 
	CONSTRAINT [PK_user] PRIMARY KEY CLUSTERED ([Identificacion] ASC )
	WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY] ) 
	ON [PRIMARY] 
	TEXTIMAGE_ON [PRIMARY]


CREATE TABLE credito ( 
	credito_id INT NOT NULL identity, 
	NombreEmpresa varchar(50) , 
	NIT  varchar(20), 
	salario  money, 
	fechaIngreso varchar(50), Identificacion [varchar](50), 
	PRIMARY KEY(credito_id), 
	FOREIGN KEY (Identificacion) 
	REFERENCES [user] (Identificacion));

	select * from [user]

	select * from credito 