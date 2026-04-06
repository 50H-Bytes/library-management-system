const MemberService = require('../services/MemberService');

class MemberController {
  async getAll(req, res, next) {
    try {
      const members = await MemberService.getAllMembers();
      res.json({ success: true, data: members });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const member = await MemberService.getMemberById(req.params.id);
      res.json({ success: true, data: member });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const member = await MemberService.createMember(req.validated);
      res.status(201).json({ success: true, data: member });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const member = await MemberService.updateMember(req.params.id, req.validated);
      res.json({ success: true, data: member });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await MemberService.deleteMember(req.params.id);
      res.json({ success: true, message: 'Member deleted' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MemberController();
