# Perfumaria Árabe Premium

Site estático pronto para GitHub Pages e VS Code.

## Arquivos
- `index.html` — estrutura da loja
- `style.css` — visual responsivo
- `script.js` — produtos, carrinho e envio para WhatsApp

## Configurar WhatsApp
Abra `script.js` e altere:

`const WHATSAPP_NUMBER = "SEU_NUMERO_AQUI";`

Use somente números, no formato internacional.
Exemplo para Brasil: `5519999999999`

## Publicar no GitHub Pages
1. Crie um repositório no GitHub.
2. Envie `index.html`, `style.css`, `script.js` e a pasta `assets`.
3. Em Settings > Pages, escolha a branch principal e a pasta `/root`.
4. Aguarde o GitHub publicar o site.

## Observação
Os produtos, preços e textos foram estruturados a partir do PDF enviado. As imagens dos frascos não foram inventadas: o layout usa uma representação visual elegante como placeholder. Você pode substituir a área de imagem de cada produto por fotos reais quando tiver os arquivos.

## Fotos dos produtos
As fotos dos frascos agora estão na pasta `assets/perfumes/` e foram extraídas das páginas do catálogo PDF fornecido, mantendo os produtos correspondentes a cada página.
