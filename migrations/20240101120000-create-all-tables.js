'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('members', {
      member_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      membership_start: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      membership_end: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'suspended'),
        defaultValue: 'active'
      }
    });

    await queryInterface.createTable('books', {
      book_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      isbn: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      pub_year: {
        type: Sequelize.INTEGER
      },
      publisher: {
        type: Sequelize.STRING(255)
      },
      language: {
        type: Sequelize.STRING(50)
      }
    });

    await queryInterface.createTable('book_copies', {
      copy_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'books', key: 'book_id' },
        onDelete: 'CASCADE'
      },
      condition: {
        type: Sequelize.ENUM('excellent', 'good', 'fair', 'poor'),
        defaultValue: 'good'
      },
      status: {
        type: Sequelize.ENUM('available', 'loaned', 'reserved', 'damaged'),
        defaultValue: 'available'
      },
      added_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.createTable('authors', {
      author_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    });

    await queryInterface.createTable('book_authors', {
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'books', key: 'book_id' },
        onDelete: 'CASCADE',
        primaryKey: true
      },
      author_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'authors', key: 'author_id' },
        onDelete: 'CASCADE',
        primaryKey: true
      }
    });

    await queryInterface.createTable('categories', {
      category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      parent_id: {
        type: Sequelize.INTEGER,
        references: { model: 'categories', key: 'category_id' },
        onDelete: 'SET NULL'
      }
    });

    await queryInterface.createTable('book_categories', {
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'books', key: 'book_id' },
        onDelete: 'CASCADE',
        primaryKey: true
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'categories', key: 'category_id' },
        onDelete: 'CASCADE',
        primaryKey: true
      }
    });

    await queryInterface.createTable('loans', {
      loan_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      copy_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'book_copies', key: 'copy_id' },
        onDelete: 'CASCADE'
      },
      member_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'members', key: 'member_id' },
        onDelete: 'CASCADE'
      },
      loan_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      due_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      return_date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('active', 'returned', 'overdue'),
        defaultValue: 'active'
      },
      fine_amount: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
      }
    });

    await queryInterface.createTable('reservations', {
      reservation_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      copy_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'book_copies', key: 'copy_id' },
        onDelete: 'CASCADE'
      },
      member_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'members', key: 'member_id' },
        onDelete: 'CASCADE'
      },
      reserved_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      expires_at: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('active', 'cancelled', 'fulfilled'),
        defaultValue: 'active'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reservations');
    await queryInterface.dropTable('loans');
    await queryInterface.dropTable('book_categories');
    await queryInterface.dropTable('categories');
    await queryInterface.dropTable('book_authors');
    await queryInterface.dropTable('authors');
    await queryInterface.dropTable('book_copies');
    await queryInterface.dropTable('books');
    await queryInterface.dropTable('members');
  }
};
