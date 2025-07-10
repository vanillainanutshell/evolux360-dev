const fs = require('fs');
const path = require('path');

// Lista de arquivos duplicados para remover
const filesToRemove = [
  'src/modules/vendas/SaleDetails.tsx',
  'src/modules/vendas/SalesForm.tsx',
  'src/modules/vendas/SalesList.tsx', 
  'src/modules/vendas/sales.routes.tsx',
  'src/modules/vendas/sales.service.ts',
  'src/modules/vendas/sales.types.ts',
  'src/components/landing/Features.jsx'
];

console.log('🧹 Removendo arquivos duplicados...\n');

filesToRemove.forEach(file => {
  const fullPath = path.join(__dirname, file);
  
  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
      console.log(`✅ Removido: ${file}`);
    } catch (error) {
      console.log(`❌ Erro ao remover ${file}:`, error.message);
    }
  } else {
    console.log(`⚠️  Arquivo não encontrado: ${file}`);
  }
});

console.log('\n🎉 Limpeza concluída!');
console.log('\n📋 Próximos passos:');
console.log('1. Verifique se não há erros de import');
console.log('2. Teste a aplicação');
console.log('3. Remova este script se tudo estiver funcionando');