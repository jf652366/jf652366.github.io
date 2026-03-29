import puppeteer from 'puppeteer'

async function checkLastUpdated() {
  console.log('正在启动浏览器...')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  try {
    const page = await browser.newPage()

    console.log('正在访问文档页面...')
    await page.goto('http://localhost:5173/docs/notes/01-常用网站', {
      waitUntil: 'networkidle0',
      timeout: 30000
    })

    // 使用更精确的选择器查找最后更新信息
    console.log('查找最后更新信息...')

    // 查找包含 "最后更新" 文本的所有元素
    const lastUpdatedElements = await page.evaluate(() => {
      const results = []
      const elements = document.body.querySelectorAll('*')

      for (let el of elements) {
        if (el.textContent && el.textContent.trim().includes('最后更新')) {
          const text = el.textContent.trim()
          const rect = el.getBoundingClientRect()

          // 筛选可见元素
          if (rect.width > 0 && rect.height > 0) {
            results.push({
              text,
              tagName: el.tagName,
              className: el.className,
              id: el.id
            })
          }
        }
      }

      return results
    })

    if (lastUpdatedElements.length > 0) {
      console.log(`找到 ${lastUpdatedElements.length} 个包含"最后更新"的元素:`)
      lastUpdatedElements.forEach((el, index) => {
        console.log(`\n${index + 1}. 元素信息:`)
        console.log(`   文本: ${el.text}`)
        console.log(`   标签: ${el.tagName}`)
        if (el.className) console.log(`   类名: ${el.className}`)
        if (el.id) console.log(`   ID: ${el.id}`)
      })
    } else {
      console.log('未找到包含"最后更新"的可见元素')
    }

    // 检查 git 信息
    console.log('\n检查 git 信息...')
    const gitInfo = await page.evaluate(() => {
      return document.querySelector('[class*="git-info"], [class*="last-updated"]')?.textContent || '未找到'
    })
    console.log('Git 信息:', gitInfo)

    // 截图显示最后更新区域
    const lastUpdatedElement = await page.$x("//*[contains(text(), '最后更新')]")
    if (lastUpdatedElement.length > 0) {
      await lastUpdatedElement[0].screenshot({
        path: '/Users/jinfeng/Desktop/workspace/jf652366.github.io/last-updated-screenshot.png'
      })
      console.log('\n✅ 已保存最后更新区域截图: last-updated-screenshot.png')
    }

    // 打印页面底部内容
    console.log('\n页面底部内容预览:')
    const bottomContent = await page.evaluate(() => {
      const footer = document.querySelector('footer, .footer, [role="contentinfo"]')
      return footer?.textContent?.substring(0, 200) || '未找到底部区域'
    })
    console.log(bottomContent)

  } catch (error) {
    console.error('❌ 检查过程中出错:', error)
  } finally {
    await browser.close()
    console.log('\n浏览器已关闭')
  }
}

checkLastUpdated()
