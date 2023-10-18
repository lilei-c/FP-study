import http from 'http'

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const keyword = /(?<=keyword=).+/.exec(req.url)
  if (keyword) {
    try {
      const url = `https://image.baidu.com/search/acjson?tn=resultjson_com&word=${keyword[0]}`
      const rst = await httpGet(url)
      res.write(rst)
    } catch (e) {
      console.error(e)
      res.write(e.message)
    }
  }
  res.end()
})

server.listen(8000)

console.log('server on http://127.0.0.1:8000, 直接从本地打开 ch6-flickr.html 查看效果')

async function httpGet(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'cache-control': 'max-age=0',
        'sec-ch-ua': '"Microsoft Edge";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        cookie:
          'BIDUPSID=01ADA3EFB44D002F81809A55C451D317; PSTM=1689562020; BAIDUID=01ADA3EFB44D002F21F66B39C8AB5FEB:FG=1; MCITY=-158%3A; H_PS_PSSID=39318_39399_39396_39418_39525_39521_39497_39465_39233_39403_26350_39421; BAIDUID_BFESS=01ADA3EFB44D002F21F66B39C8AB5FEB:FG=1; delPer=0; BA_HECTOR=00ah8l0k20ahag21050gaka31iiut6i1p; ZFY=pG:AL:BE82upVFYtJIDYFXiL2igauSaGWZQzxjztucwrE:C; PSINO=3; BDRCVFR[dG2JNJb_ajR]=mk3SLVN4HKm; BDRCVFR[-pGxjrCMryR]=mk3SLVN4HKm; cleanHistoryStatus=0; indexPageSugList=%5B%221111111111111111111111%22%2C%22cat%22%5D',
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
    })
      .then((res) => res.text())
      .then((text) => {
        resolve(text)
        // console.log(text)
      })
      .catch((e) => reject(e))
  })
}
