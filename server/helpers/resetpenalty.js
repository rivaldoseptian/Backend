const { Member } = require("../models");

async function resetPenaltyStatus(id) {
  const member = await Member.findByPk(id);
  const lastBorrowDate = member.updatedAt;
  const now = new Date();
  const diffTime = now.getTime() - lastBorrowDate.getTime();
  const diffDays = diffTime / (1000 * 3600 * 24);
  if (diffDays >= 3) {
    member.update({ penalty: false });
  }
}

module.exports = resetPenaltyStatus;
