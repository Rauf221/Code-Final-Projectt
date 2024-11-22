const FilterProducts = require('../Models/FilterProducts');

// Get all products with advanced filtering, sorting, and pagination
exports.getAllFilteredProducts = async (req, res) => {
  try {
    const {
      name, priceMin, priceMax, ratingMin, ratingMax,
      discount, availability, category, color, brand, size,
      page = 1, limit = 12, sortBy, sortOrder
    } = req.query;

    let filterCriteria = {};

    // Add filters based on query parameters
    if (name) {
      filterCriteria.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }
    if (priceMin || priceMax) {
      filterCriteria.price = {};
      if (priceMin) filterCriteria.price.$gte = parseFloat(priceMin);
      if (priceMax) filterCriteria.price.$lte = parseFloat(priceMax);
    }
    if (ratingMin || ratingMax) {
      filterCriteria.rating = {};
      if (ratingMin) filterCriteria.rating.$gte = parseFloat(ratingMin);
      if (ratingMax) filterCriteria.rating.$lte = parseFloat(ratingMax);
    }
    if (discount) {
      filterCriteria.discount = { $exists: true, $ne: null }; // Check if discount exists
    }
    if (availability) {
      filterCriteria.availability = availability;
    }
    if (category) {
      filterCriteria.category = { $regex: category, $options: 'i' }; // Case-insensitive
    }
    if (color) {
      filterCriteria.color = { $in: color.split(',') }; // Handle multiple colors
    }
    if (brand) {
      filterCriteria.brand = { $in: brand.split(',') }; // Handle multiple brands
    }
    if (size) {
      filterCriteria.size = size;
    }

    // Pagination setup
    const skip = (page - 1) * limit;
    const limitNum = parseInt(limit);

    // Sorting setup
    let sortCriteria = {};
    if (sortBy && sortOrder) {
      sortCriteria[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    // Fetch products with the constructed filter criteria
    const filterProducts = await FilterProducts.find(filterCriteria)
      .skip(skip)
      .limit(limitNum)
      .sort(sortCriteria);

    // Count total products for pagination
    const totalCount = await FilterProducts.countDocuments(filterCriteria);

    res.status(200).json({
      products: filterProducts,
      totalCount,
      totalPages: Math.ceil(totalCount / limitNum),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Ürün ID'ye göre getirme
exports.getFilterProductById = async (req, res) => {
  try {
    const filterProduct = await FilterProducts.findById(req.params.id);
    if (!filterProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(filterProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

// Yeni ürün oluşturma
exports.createFilterProduct = async (req, res) => {
  try {
    const newProduct = new FilterProducts(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

// Ürünü ID'ye göre güncelleme
exports.updateFilterProduct = async (req, res) => {
  try {
    const updatedProduct = await FilterProducts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

// Ürünü ID'ye göre silme
exports.deleteFilterProduct = async (req, res) => {
  try {
    const deletedProduct = await FilterProducts.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};
