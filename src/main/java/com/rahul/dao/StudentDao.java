package com.rahul.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import java.util.List;
import org.hibernate.query.Query;
import com.rahul.model.Student;

public class StudentDao {

    private SessionFactory sessionFactory;
// READ ALL STUDENTS
public void getAllStudents() {

    Session session = null;

    try {

        session = sessionFactory.openSession();

        Query<Student> query = session.createQuery("from Student", Student.class);

        List<Student> students = query.list();

        System.out.println("\n========= STUDENT LIST =========");

        for (Student student : students) {

            System.out.println("--------------------------------");
            System.out.println("ID         : " + student.getId());
            System.out.println("First Name : " + student.getFirstName());
            System.out.println("Last Name  : " + student.getLastName());
            System.out.println("Email      : " + student.getEmail());

        }

        System.out.println("--------------------------------");

    } catch (Exception e) {

        e.printStackTrace();

    } finally {

        if (session != null) {
            session.close();
        }

    }

}
    // Default Constructor
    public StudentDao() {
    }

    // Setter Injection
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    // CREATE
    public void saveStudent(Student student) {

        Session session = null;
        Transaction transaction = null;

        try {

            session = sessionFactory.openSession();

            transaction = session.beginTransaction();

            session.persist(student);

            transaction.commit();

            System.out.println("\nStudent Saved Successfully.");

        } catch (Exception e) {

            if (transaction != null) {
                transaction.rollback();
            }

            e.printStackTrace();

        } finally {

            if (session != null) {
                session.close();
            }

        }

    }
    // SEARCH STUDENT BY ID
public void getStudentById(int id) {

    Session session = null;

    try {

        session = sessionFactory.openSession();

        Student student = session.get(Student.class, id);

        if (student != null) {

            System.out.println("\n===== STUDENT DETAILS =====");

            System.out.println("ID         : " + student.getId());
            System.out.println("First Name : " + student.getFirstName());
            System.out.println("Last Name  : " + student.getLastName());
            System.out.println("Email      : " + student.getEmail());

        } else {

            System.out.println("Student Not Found.");

        }

    } catch (Exception e) {

        e.printStackTrace();

    } finally {

        if (session != null)
            session.close();

    }

}
// UPDATE STUDENT
public void updateStudent(int id, String firstName, String lastName, String email) {

    Session session = null;
    Transaction transaction = null;

    try {

        session = sessionFactory.openSession();

        transaction = session.beginTransaction();

        Student student = session.get(Student.class, id);

        if (student != null) {

            student.setFirstName(firstName);
            student.setLastName(lastName);
            student.setEmail(email);

            session.merge(student);

            transaction.commit();

            System.out.println("\nStudent Updated Successfully.");

        } else {

            System.out.println("Student Not Found.");
            transaction.rollback();

        }

    } catch (Exception e) {

        if (transaction != null) {
            transaction.rollback();
        }

        e.printStackTrace();

    } finally {

        if (session != null) {
            session.close();
        }

    }

}
// DELETE STUDENT
public void deleteStudent(int id) {

    Session session = null;
    Transaction transaction = null;

    try {

        session = sessionFactory.openSession();

        transaction = session.beginTransaction();

        Student student = session.get(Student.class, id);

        if (student != null) {

            session.remove(student);

            transaction.commit();

            System.out.println("\nStudent Deleted Successfully.");

        } else {

            System.out.println("Student Not Found.");

            transaction.rollback();

        }

    } catch (Exception e) {

        if (transaction != null) {
            transaction.rollback();
        }

        e.printStackTrace();

    } finally {

        if (session != null) {
            session.close();
        }

    }

}

}