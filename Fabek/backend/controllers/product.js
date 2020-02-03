import Product, { updateOne, find, count as _count, findById, deleteOne } from "../models/product";

export function createProduct(req, res, next) {
  const url = req.protocol + "://" + req.get("host");
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imagePath: url + "/images/" + req.file.filename
    // creator: req.userData.userId
  });
  product
    .save()
    .then(createdPost => {
      res.status(201).json({
        message: "Product added successfully",
        product: {
          ...createdProduct,
          id: createdProduct._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a product failed!"
      });
    });
}

export function updateProduct(req, res, next) {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imagePath: imagePath
    // creator: req.userData.userId
  });
  updateOne({ _id: req.params.id }, product)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate product!"
      });
    });
}

export function getProducts( res) {
  const postQuery = find();
  let fetchedProducts;
  productQuery
    .then(documents => {
      fetchedProducts = documents;
      return _count();
    })
    .then(count => {
      res.status(200).json({
        message: "Products fetched successfully!",
        products: fetchedProducts
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching products failed!"
      });
    });
}

export function getProduct(req, res, next) {
  findById(req.params.id)
    .then(post => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching post failed!"
      });
    });
}

export function deletePost(req, res, next) {
  deleteOne({ _id: req.params.id})
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Product deleted successfully!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting product failed!"
      });
    });
}
