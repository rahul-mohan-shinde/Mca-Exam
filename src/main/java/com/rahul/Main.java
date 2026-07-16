package com.rahul;

import java.util.Scanner;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.rahul.dao.StudentDao;
import com.rahul.model.Student;

public class Main {

    public static void main(String[] args) {

        ClassPathXmlApplicationContext context =
                new ClassPathXmlApplicationContext("applicationContext.xml");

        StudentDao dao = context.getBean("studentDao", StudentDao.class);

        Scanner sc = new Scanner(System.in);

        int choice;

        do {

            System.out.println("\n==============================");
            System.out.println(" STUDENT MANAGEMENT SYSTEM");
            System.out.println("==============================");
            System.out.println("1. Add Student");
            System.out.println("2. View All Students");
            System.out.println("3. Search Student By ID");
            System.out.println("4. Update Student");
            System.out.println("5. Delete Student");
            System.out.println("6. Exit");

            System.out.print("\nEnter Choice : ");

            choice = Integer.parseInt(sc.nextLine());

            switch (choice) {

                case 1:

                    Student student = new Student();

                    System.out.print("Enter First Name : ");
                    student.setFirstName(sc.nextLine());

                    System.out.print("Enter Last Name : ");
                    student.setLastName(sc.nextLine());

                    System.out.print("Enter Email : ");
                    student.setEmail(sc.nextLine());

                    dao.saveStudent(student);

                    break;

                case 2:

                    dao.getAllStudents();

                    break;

                case 3:

                    System.out.print("Enter Student ID : ");

                    int id = Integer.parseInt(sc.nextLine());

                    dao.getStudentById(id);

                    break;

                case 4:

                    System.out.print("Enter Student ID : ");

                    int updateId = Integer.parseInt(sc.nextLine());

                    System.out.print("Enter New First Name : ");
                    String firstName = sc.nextLine();

                    System.out.print("Enter New Last Name : ");
                    String lastName = sc.nextLine();

                    System.out.print("Enter New Email : ");
                    String email = sc.nextLine();

                    dao.updateStudent(updateId, firstName, lastName, email);

                    break;

                case 5:

                    System.out.print("Enter Student ID : ");

                    int deleteId = Integer.parseInt(sc.nextLine());

                    dao.deleteStudent(deleteId);

                    break;

                case 6:

                    System.out.println("\nThank You...");

                    break;

                default:

                    System.out.println("\nInvalid Choice.");

            }

        } while (choice != 6);

        sc.close();

        context.close();

    }

}