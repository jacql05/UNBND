# UNBND Landing Page

A fast, accessible, and multilingual landing page built with modern web technologies.

![UNBND Landing Page](https://github.com/user-attachments/assets/82b54f41-53a4-4bea-a5ca-d13af50cda0b)

## 🚀 Features

- **🌍 Internationalization (i18n)**: Full support for English and Chinese with automatic language detection
- **📱 Responsive Design**: Optimized for all device sizes and screen orientations
- **♿ Accessibility**: WCAG 2.1 compliant with semantic HTML and proper ARIA labels
- **⚡ Performance**: Bundle size <150KB, Lighthouse score ≥90
- **📊 Analytics**: Integrated support for Google Analytics, Facebook Pixel, and Hotjar
- **🎨 Modern UI**: Clean, professional design with smooth animations
- **📞 Contact Integration**: Multi-platform contact options with WhatsApp, Telegram, WeChat, and Calendly
- **⏱️ Live Countdown**: Real-time countdown timer for Melbourne events
- **💬 Customer Reviews**: Rotating testimonials carousel
- **🎯 Agency Spotlight**: One-time promotional banner system
- **📈 Scroll Progress**: Visual scroll progress indicator

## 🛠️ Tech Stack

- **Framework**: Vite + TypeScript
- **Styling**: CSS3 with PostCSS and Autoprefixer
- **Code Quality**: ESLint + Prettier
- **Deployment**: GitHub Pages with CI/CD
- **Analytics**: Google Analytics, Facebook Pixel, Hotjar support

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/jacql05/UNBND.git
cd UNBND
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your actual values:
```env
VITE_WHATSAPP=1234567890
VITE_TELEGRAM=your_telegram_username
VITE_WECHAT=your_wechat_id
VITE_CALENDLY=https://calendly.com/your-username
VITE_GTAG=G-XXXXXXXXXX
VITE_FACEBOOK_PIXEL=123456789012345
VITE_HOTJAR=1234567
```

## 🚦 Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173/`

## 🔧 Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🧪 Testing & Quality

Run linting:
```bash
npm run lint
npm run lint:fix
```

Format code:
```bash
npm run format
npm run format:check
```

## 🌐 Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider.

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. Add your environment variables as repository secrets:
   - `VITE_WHATSAPP`
   - `VITE_TELEGRAM`
   - `VITE_WECHAT`
   - `VITE_CALENDLY`
   - `VITE_GTAG`
   - `VITE_FACEBOOK_PIXEL`
   - `VITE_HOTJAR`

## 🎯 Features Overview

### Internationalization
- Automatic browser language detection
- Manual language switching (EN/中文)
- Persistent language preference in localStorage
- Complete translation coverage

### Contact Methods
- **WhatsApp**: Direct messaging link
- **Telegram**: Channel/user link
- **WeChat**: QR code modal
- **Calendly**: Meeting scheduling integration

### Analytics Integration
- Google Analytics 4 support
- Facebook Pixel tracking
- Hotjar heatmaps and recordings
- Custom event tracking for user interactions

### Performance Optimizations
- CSS and JavaScript minification
- Image optimization
- Lazy loading
- Bundle splitting
- Tree shaking

### Accessibility Features
- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management

## 📱 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please contact us through:
- WhatsApp: Set via `VITE_WHATSAPP` environment variable
- Telegram: Set via `VITE_TELEGRAM` environment variable
- WeChat: Set via `VITE_WECHAT` environment variable
- Email: Schedule a meeting via Calendly link

## 🔄 Changelog

### Version 1.0.0
- Initial release
- Full i18n support (EN/CN)
- Responsive design
- Analytics integration
- Contact system
- Performance optimizations
- Accessibility compliance
