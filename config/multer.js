const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configuração do storage do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Pasta onde os arquivos serão salvos
  },
  filename: function (req, file, cb) {
    // Gera um nome único para o arquivo usando UUID
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// Filtro para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  // Verifica se o arquivo é uma imagem
  if (file.mimetype.startsWith('image/')) {
    // Verifica se é um formato aceito
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos JPG, JPEG e PNG são permitidos.'), false);
    }
  } else {
    cb(new Error('Apenas imagens são permitidas.'), false);
  }
};

// Configuração do multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // Limite de 2MB
  }
});

module.exports = upload;
