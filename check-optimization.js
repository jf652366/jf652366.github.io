import puppeteer from 'puppeteer'

async function checkOptimization() {
  console.log('正在启动浏览器...')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  try {
    const page = await browser.newPage()

    console.log('正在访问首页...')
    await page.goto('http://localhost:5173/docs/notes/01-常用网站', {
      waitUntil: 'networkidle0',
      timeout: 30000
    })

    console.log('页面标题:', await page.title())

    // 检查页面目录是否是中文
    console.log('\n检查页面目录...')
    const outlineTitle = await page.evaluate(() => {
      const elements = document.querySelectorAll('h2, .outline-title, .VPSidebarItemTitle')
      for (let el of elements) {
        if (el.textContent && el.textContent.includes('页面目录')) {
          return el.textContent
        }
      }
      return '未找到页面目录'
    })
    console.log('页面目录标题:', outlineTitle)

    // 检查最后更新时间格式
    console.log('\n检查最后更新时间...')
    const lastUpdated = await page.evaluate(() => {
      const elements = document.querySelectorAll('*')
      for (let el of elements) {
        if (el.textContent && el.textContent.includes('最后更新')) {
          return el.textContent
        }
      }
      return '未找到最后更新信息'
    })
    console.log('最后更新信息:', lastUpdated)

    // 检查页面是否包含预期内容
    console.log('\n检查页面内容...')
    const content = await page.content()

    if (content.includes('页面目录')) {
      console.log('✅ 页面目录已成功翻译为中文')
    }

    if (content.includes('最后更新')) {
      console.log('✅ 最后更新信息已正确显示')
    }

    // 截图保存
    await page.screenshot({
      path: '/Users/jinfeng/Desktop/workspace/jf652366.github.io/optimization-check.png',
      fullPage: true
    })
    console.log('\n✅ 已保存页面截图: optimization-check.png')

  } catch (error) {
    console.error('❌ 检查过程中出错:', error)
  } finally {
    await browser.close()
    console.log('\n浏览器已关闭')
  }
}

checkOptimization()
