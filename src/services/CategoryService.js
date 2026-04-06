const { Category } = require('../models');

class CategoryService {
  async getAllCategories() {
    return await Category.findAll({
      include: [
        { association: 'subCategories' },
        { association: 'books', through: { attributes: [] } }
      ]
    });
  }

  async getCategoryById(categoryId) {
    const category = await Category.findByPk(categoryId, {
      include: [
        { association: 'subCategories' },
        { association: 'books', through: { attributes: [] } }
      ]
    });
    if (!category) throw new Error('Category not found');
    return category;
  }

  async createCategory(data) {
    return await Category.create(data);
  }

  async updateCategory(categoryId, data) {
    const category = await Category.findByPk(categoryId);
    if (!category) throw new Error('Category not found');
    return await category.update(data);
  }

  async deleteCategory(categoryId) {
    const category = await Category.findByPk(categoryId);
    if (!category) throw new Error('Category not found');
    await category.destroy();
  }
}

module.exports = new CategoryService();
