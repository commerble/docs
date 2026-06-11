/**
 * CommerbleCorp Theme JavaScript
 * メインJavaScriptファイル - モバイルメニュー、ダークモード、パフォーマンス最適化
 */

(function() {
  'use strict';

  // DOM読み込み完了後に実行
  document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initDarkMode();
    initSmoothScroll();
    initLazyLoading();
    initBackToTop();
    initContactForm();
  });

  /**
   * モバイルメニューの初期化
   */
  function initMobileMenu() {
    const menuToggle = document.querySelector('.header__menu-toggle');
    const mobileMenu = document.querySelector('.header__mobile-menu');
    const body = document.body;

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', function() {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;

      // ARIAの状態を更新
      menuToggle.setAttribute('aria-expanded', newState);
      mobileMenu.setAttribute('aria-hidden', !newState);

      // ボディのスクロールを制御
      if (newState) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }

      // メニューラベルを更新
      menuToggle.setAttribute('aria-label', newState ? 'メニューを閉じる' : 'メニューを開く');
    });

    // モバイルメニューのリンクをクリックしたらメニューを閉じる
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        body.style.overflow = '';
        menuToggle.setAttribute('aria-label', 'メニューを開く');
      });
    });

    // Escapeキーでメニューを閉じる
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        body.style.overflow = '';
        menuToggle.setAttribute('aria-label', 'メニューを開く');
        menuToggle.focus();
      }
    });

    // ウィンドウサイズが変更されたらモバイルメニューを閉じる
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768 && menuToggle.getAttribute('aria-expanded') === 'true') {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        body.style.overflow = '';
        menuToggle.setAttribute('aria-label', 'メニューを開く');
      }
    });
  }

  /**
   * ダークモード切替の初期化
   * auto（システム設定に従う）、light（明示的ライト）、dark（明示的ダーク）の3モード対応
   */
  function initDarkMode() {
    const themeToggle = document.querySelector('.header__theme-toggle');
    if (!themeToggle) return;

    // 保存されたテーマを読み込み、なければauto（システム設定）を使用
    const savedTheme = localStorage.getItem('theme') || 'auto';
    
    // 初期テーマを適用
    applyTheme(savedTheme);
    updateThemeToggleLabel(savedTheme);

    // テーマ切替ボタンのクリックイベント
    themeToggle.addEventListener('click', function() {
      const currentTheme = getCurrentTheme();
      const newTheme = getNextTheme(currentTheme);
      
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeToggleLabel(newTheme);
    });

    // システムのテーマ設定変更を監視（autoモードの時のみ反映）
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'auto' || !savedTheme) {
        updateThemeToggleLabel('auto');
      }
    });

    function getCurrentTheme() {
      return localStorage.getItem('theme') || 'auto';
    }

    function getNextTheme(currentTheme) {
      // auto → light → dark → auto のサイクル
      switch (currentTheme) {
        case 'auto': return 'light';
        case 'light': return 'dark';
        case 'dark': return 'auto';
        default: return 'auto';
      }
    }

    function applyTheme(theme) {
      const htmlElement = document.documentElement;
      
      // 既存のテーマクラスを削除
      htmlElement.classList.remove('light-mode', 'dark-mode');
      
      switch (theme) {
        case 'light':
          htmlElement.classList.add('light-mode');
          break;
        case 'dark':
          htmlElement.classList.add('dark-mode');
          break;
        case 'auto':
        default:
          // autoの場合はクラスを追加しない（CSS の media query に従う）
          break;
      }
    }

    function updateThemeToggleLabel(theme) {
      let label;
      switch (theme) {
        case 'auto':
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          label = systemPrefersDark ? 'ライトモード（固定）に切り替え' : 'ダークモード（固定）に切り替え';
          break;
        case 'light':
          label = 'ダークモード（固定）に切り替え';
          break;
        case 'dark':
          label = 'システム設定に従う';
          break;
        default:
          label = 'テーマを切り替え';
      }
      themeToggle.setAttribute('aria-label', label);
      themeToggle.setAttribute('title', label);
    }
  }

  /**
   * スムーススクロールの初期化
   */
  function initSmoothScroll() {
    // ハッシュリンクにスムーススクロールを適用
    const hashLinks = document.querySelectorAll('a[href^="#"]');
    
    hashLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          // ヘッダーの高さを考慮してスクロール位置を調整
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 16; // 16pxのマージン
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // フォーカスを移動（アクセシビリティ）
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      });
    });
  }

  /**
   * 遅延読み込みの初期化（Intersection Observer使用）
   */
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // 画像の読み込み完了時にクラスを追加
            img.addEventListener('load', function() {
              img.classList.add('loaded');
            });
            
            // 既に読み込まれている場合はすぐにクラスを追加
            if (img.complete) {
              img.classList.add('loaded');
            }
            
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px'
      });

      lazyImages.forEach(function(img) {
        imageObserver.observe(img);
      });
    } else {
      // Intersection Observerが使用できない場合は即座に読み込み
      lazyImages.forEach(function(img) {
        img.classList.add('loaded');
      });
    }
  }

  /**
   * トップに戻るボタンの初期化
   */
  function initBackToTop() {
    // トップに戻るボタンを動的に作成
    const backToTopButton = document.createElement('button');
    backToTopButton.type = 'button';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'ページの先頭に戻る');
    backToTopButton.innerHTML = '❮';
    backToTopButton.style.transform = 'rotateZ(90deg)';
    backToTopButton.style.paddingBottom = '4px';
    backToTopButton.style.paddingLeft = '4px';
    document.body.appendChild(backToTopButton);

    // スクロール位置に応じてボタンの表示/非表示を制御
    let isVisible = false;
    
    function toggleBackToTop() {
      const shouldShow = window.pageYOffset > 300;
      
      if (shouldShow && !isVisible) {
        backToTopButton.classList.add('back-to-top--visible');
        isVisible = true;
      } else if (!shouldShow && isVisible) {
        backToTopButton.classList.remove('back-to-top--visible');
        isVisible = false;
      }
    }

    // スクロールイベントをthrottle
    let ticking = false;
    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(function() {
          toggleBackToTop();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ボタンクリック時の動作
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * パフォーマンス関連のユーティリティ
   */

  // サイトの読み込み完了時に不要なCSSを削除（Critical CSS最適化）
  window.addEventListener('load', function() {
    // パフォーマンス測定やその他の初期化処理をここに配置
  });

  // Web Vitals測定（開発時のデバッグ用）
  if (typeof console !== 'undefined' && console.log && window.location.hostname === 'localhost') {
    // First Contentful Paint
    new PerformanceObserver(function(entryList) {
      const entries = entryList.getEntries();
      entries.forEach(function(entry) {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime);
        }
      });
    }).observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    new PerformanceObserver(function(entryList) {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver(function(entryList) {
      entryList.getEntries().forEach(function(entry) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          console.log('CLS:', clsValue);
        }
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }

  /**
   * お問い合わせフォームの初期化
   */
  function initContactForm() {
    const form = document.querySelector('.form');
    if (!form) return;

    const submitButton = form.querySelector('button[type="submit"]');
    const formControls = form.querySelectorAll('.form-control');

    // リアルタイムバリデーション
    formControls.forEach(function(control) {
      control.addEventListener('blur', function() {
        validateField(control);
      });

      control.addEventListener('input', function() {
        if (control.hasAttribute('data-touched')) {
          validateField(control);
        }
      });
    });

    // フォーム送信処理
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 全フィールドをバリデーション
      let isValid = true;
      formControls.forEach(function(control) {
        control.setAttribute('data-touched', 'true');
        if (!validateField(control)) {
          isValid = false;
        }
      });

      if (isValid) {
        submitForm(form, submitButton);
      }
    });
  }

  /**
   * フィールドのバリデーション
   */
  function validateField(field) {
    const errorElement = document.getElementById(field.id + '-error');
    if (!errorElement) return true;

    let isValid = true;
    let errorMessage = '';

    // 必須チェック
    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      errorMessage = getFieldName(field) + 'は必須項目です。';
    }

    // メールアドレスの形式チェック
    if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        errorMessage = '正しいメールアドレスを入力してください。';
      }
    }

    // セレクトボックスのチェック
    if (field.tagName === 'SELECT' && field.hasAttribute('required') && !field.value) {
      isValid = false;
      errorMessage = getFieldName(field) + 'を選択してください。';
    }

    // エラーメッセージの表示
    errorElement.textContent = errorMessage;
    
    // スタイルの更新
    if (isValid) {
      field.classList.remove('form-control--error');
      field.classList.add('form-control--valid');
    } else {
      field.classList.remove('form-control--valid');
      field.classList.add('form-control--error');
    }

    return isValid;
  }

  /**
   * フィールド名を取得
   */
  function getFieldName(field) {
    const label = document.querySelector('label[for="' + field.id + '"]');
    if (label) {
      return label.textContent.replace(/\s*\*\s*$/, '').trim();
    }
    return 'この項目';
  }

  /**
   * フォーム送信
   */
  function submitForm(form, submitButton) {
    // ローディング状態を表示
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    // フォームデータを作成
    const formData = new FormData(form);

    // Fetch APIで送信
    fetch(form.action, {
      method: 'POST',
      body: formData
    })
    .then(function(response) {
      if (response.ok) {
        location.href = '/contact/thanks';
      } else {
        throw new Error('送信に失敗しました');
      }
    })
    .catch(function(error) {
      console.error('Error:', error);
      showErrorMessage();
    })
    .finally(function() {
      // ローディング状態を解除
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
    });
  }

  /**
   * エラーメッセージを表示
   */
  function showErrorMessage() {
    const form = document.querySelector('.form');
    const message = document.createElement('div');
    message.className = 'form-message form-message--error';
    message.innerHTML = `
      <p><strong>送信に失敗しました。</strong></p>
      <p>時間をおいて再度お試しください。</p>
    `;
    
    form.parentNode.insertBefore(message, form);
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

})();