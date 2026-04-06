const { Member } = require('../models');

class MemberService {
  async getAllMembers() {
    return await Member.findAll();
  }

  async getMemberById(memberId) {
    const member = await Member.findByPk(memberId, {
      include: ['loans', 'reservations']
    });
    if (!member) throw new Error('Member not found');
    return member;
  }

  async createMember(data) {
    return await Member.create(data);
  }

  async updateMember(memberId, data) {
    const member = await Member.findByPk(memberId);
    if (!member) throw new Error('Member not found');
    return await member.update(data);
  }

  async deleteMember(memberId) {
    const member = await Member.findByPk(memberId);
    if (!member) throw new Error('Member not found');
    await member.destroy();
  }
}

module.exports = new MemberService();
