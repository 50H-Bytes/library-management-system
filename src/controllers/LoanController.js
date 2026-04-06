const LoanService = require('../services/LoanService');

class LoanController {
  async getAll(req, res, next) {
    try {
      const loans = await LoanService.getAllLoans();
      res.json({ success: true, data: loans });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const loan = await LoanService.getLoanById(req.params.id);
      res.json({ success: true, data: loan });
    } catch (error) {
      next(error);
    }
  }

  async borrow(req, res, next) {
    try {
      const loan = await LoanService.createLoan(req.validated);
      res.status(201).json({ success: true, data: loan });
    } catch (error) {
      next(error);
    }
  }

  async returnBook(req, res, next) {
    try {
      const loan = await LoanService.returnLoan(req.params.id);
      res.json({ success: true, data: loan });
    } catch (error) {
      next(error);
    }
  }

  async getMemberLoans(req, res, next) {
    try {
      const loans = await LoanService.getMemberLoans(req.params.memberId);
      res.json({ success: true, data: loans });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LoanController();
