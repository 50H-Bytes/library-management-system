const { Loan, BookCopy, Member } = require('../models');

class LoanService {
  async getAllLoans() {
    return await Loan.findAll({
      include: [
        { association: 'member' },
        { association: 'copy', include: 'book' }
      ]
    });
  }

  async getLoanById(loanId) {
    const loan = await Loan.findByPk(loanId, {
      include: [
        { association: 'member' },
        { association: 'copy', include: 'book' }
      ]
    });
    if (!loan) throw new Error('Loan not found');
    return loan;
  }

  async createLoan(data) {
    const member = await Member.findByPk(data.memberId);
    if (!member) throw new Error('Member not found');
    if (member.status !== 'active') throw new Error('Member is not active');

    const copy = await BookCopy.findByPk(data.copyId);
    if (!copy) throw new Error('Copy not found');
    if (copy.status !== 'available') throw new Error('Copy is not available');

    // Update copy status
    await copy.update({ status: 'loaned' });

    return await Loan.create(data);
  }

  async returnLoan(loanId) {
    const loan = await Loan.findByPk(loanId, {
      include: { association: 'copy' }
    });
    if (!loan) throw new Error('Loan not found');
    if (loan.status === 'returned') throw new Error('Loan already returned');

    const returnDate = new Date();
    const dueDate = new Date(loan.dueDate);
    
    // Calculate fine if overdue
    let fineAmount = 0;
    if (returnDate > dueDate) {
      const daysOverdue = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24));
      fineAmount = daysOverdue * 2; // 2 per day
    }

    // Update copy status to available
    await loan.copy.update({ status: 'available' });

    return await loan.update({
      returnDate,
      fineAmount,
      status: returnDate > dueDate ? 'overdue' : 'returned'
    });
  }

  async getMemberLoans(memberId) {
    return await Loan.findAll({
      where: { memberId },
      include: [
        { association: 'member' },
        { association: 'copy', include: 'book' }
      ]
    });
  }
}

module.exports = new LoanService();
