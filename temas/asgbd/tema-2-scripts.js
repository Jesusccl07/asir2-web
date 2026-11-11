/* ASGBD · Tema 2 — código de los ejercicios de práctica */
window.ASGBD2_SCRIPTS = {
  script_scott: {file:'script_scott.sql', code: String.raw`DROP TABLE DUMMY CASCADE CONSTRAINTS;

DROP TABLE DEPT CASCADE CONSTRAINTS;

DROP TABLE EMP CASCADE CONSTRAINTS;

DROP TABLE BONUS CASCADE CONSTRAINTS;

DROP TABLE SALGRADE CASCADE CONSTRAINTS;

CREATE TABLE DUMMY (DUMMY NUMBER);

CREATE TABLE DEPT (
        DEPTNO NUMBER(2) CONSTRAINT PK_DEPT PRIMARY KEY,
        DNAME VARCHAR2(14),
        LOC VARCHAR2(13));

CREATE TABLE EMP (
        EMPNO NUMBER(4) CONSTRAINT PK_EMP PRIMARY KEY,
        ENAME VARCHAR2(10),
        JOB VARCHAR2(9),
        MGR NUMBER(4),
        HIREDATE DATE,
        SAL NUMBER(7,2),
        COMM NUMBER(7,2),
        DEPTNO NUMBER(2) CONSTRAINT FK_DEPTNO REFERENCES DEPT);

CREATE TABLE BONUS (
        ENAME VARCHAR2(10),
        JOB VARCHAR2(9),
        SAL NUMBER,
        COMM NUMBER);

CREATE TABLE SALGRADE (
        GRADE NUMBER,
        LOSAL NUMBER,
        HISAL NUMBER);

-- Inserción de datos en las tablas

INSERT INTO DEPT VALUES (10,'ACCOUNTING','NEW YORK');
INSERT INTO DEPT VALUES (20,'RESEARCH','DALLAS');
INSERT INTO DEPT VALUES (30,'SALES','CHICAGO');
INSERT INTO DEPT VALUES (40,'OPERATIONS','BOSTON');

INSERT INTO EMP VALUES (7369,'SMITH','CLERK',7902,to_date('17-12-1980','dd-mm-yyyy'),800,NULL,20);
INSERT INTO EMP VALUES (7499,'ALLEN','SALESMAN',7698,to_date('20-2-1981','dd-mm-yyyy'),1600,300,30);
INSERT INTO EMP VALUES (7521,'WARD','SALESMAN',7698,to_date('22-2-1981','dd-mm-yyyy'),1250,500,30);
INSERT INTO EMP VALUES (7566,'JONES','MANAGER',7839,to_date('2-4-1981','dd-mm-yyyy'),2975,NULL,20);
INSERT INTO EMP VALUES (7654,'MARTIN','SALESMAN',7698,to_date('28-9-1981','dd-mm-yyyy'),1250,1400,30);
INSERT INTO EMP VALUES (7698,'BLAKE','MANAGER',7839,to_date('1-5-1981','dd-mm-yyyy'),2850,NULL,30);
INSERT INTO EMP VALUES (7782,'CLARK','MANAGER',7839,to_date('9-6-1981','dd-mm-yyyy'),2450,NULL,10);
INSERT INTO EMP VALUES (7788,'SCOTT','ANALYST',7566,to_date('13-JUL-87')-85,3000,NULL,20);
INSERT INTO EMP VALUES (7839,'KING','PRESIDENT',NULL,to_date('17-11-1981','dd-mm-yyyy'),5000,NULL,10);
INSERT INTO EMP VALUES (7844,'TURNER','SALESMAN',7698,to_date('8-9-1981','dd-mm-yyyy'),1500,0,30);
INSERT INTO EMP VALUES (7876,'ADAMS','CLERK',7788,to_date('13-JUL-87')-51,1100,NULL,20);
INSERT INTO EMP VALUES (7900,'JAMES','CLERK',7698,to_date('3-12-1981','dd-mm-yyyy'),950,NULL,30);
INSERT INTO EMP VALUES (7902,'FORD','ANALYST',7566,to_date('3-12-1981','dd-mm-yyyy'),3000,NULL,20);
INSERT INTO EMP VALUES (7934,'MILLER','CLERK',7782,to_date('23-1-1982','dd-mm-yyyy'),1300,NULL,10);

INSERT INTO SALGRADE VALUES (1,700,1200);
INSERT INTO SALGRADE VALUES (2,1201,1400);
INSERT INTO SALGRADE VALUES (3,1401,2000);
INSERT INTO SALGRADE VALUES (4,2001,3000);
INSERT INTO SALGRADE VALUES (5,3001,9999);

INSERT INTO DUMMY VALUES (0);

COMMIT;
`},
  dicc_consultas: {file:'consultas_diccionario.sql', code: String.raw`-- Tablas de SCOTT
SELECT table_name FROM dba_tables WHERE owner = 'SCOTT';

-- Tablas, vistas y sinónimos propios
SELECT * FROM user_catalog;

-- Columnas de una tabla
DESC scott.emp;

-- Constraints de una tabla y sus columnas
SELECT c.constraint_name, c.constraint_type, cc.column_name
FROM   user_constraints c
JOIN   user_cons_columns cc ON cc.constraint_name = c.constraint_name
WHERE  c.table_name = 'EMP';

-- Tablespaces que usa un usuario
SELECT DISTINCT tablespace_name FROM dba_segments WHERE owner = 'SCOTT';

-- Nombre y estado de la instancia
SELECT instance_name, status FROM v$instance;

-- Dónde están los archivos de control
SELECT name FROM v$controlfile;
`}
};
