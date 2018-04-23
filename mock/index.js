const koa = require('koa');
const Router = require('koa-router');

const app = new koa();
const router = new Router();

router.post('/api/login', async (ctx) => {
  ctx.body = {
    "success": true,
    "message": "success",
    "data": null,
  }
})
router('/api/site', async (ctx) => {
  ctx.body = {
    "success": true,
    "message": "success",
    "data": [
      {
        depart: '运营',
        sites: [
          {
            iconUrl: 'https://qhyxpicoss.kujiale.com/2018/04/19/LLLRDEQKAEBKKVRXAAAAAEI8_80x80.png',
            name: 'CMDB'
          },
          {
            iconUrl: 'https://qhyxpicoss.kujiale.com/2018/04/19/LLLRDEQKAEBKKVRXAAAAAEI8_80x80.png',
            name: 'CMDB'
          },
          {
            iconUrl: 'https://qhyxpicoss.kujiale.com/2018/04/19/LLLRDEQKAEBKKVRXAAAAAEI8_80x80.png',
            name: 'CMDB'
          },
        ]
      },
      {
        depart: '运营',
        sites: [
          {
            iconUrl: 'https://qhyxpicoss.kujiale.com/2018/04/19/LLLRDEQKAEBKKVRXAAAAAEI8_80x80.png',
            name: 'CMDB'
          },
          {
            iconUrl: 'https://qhyxpicoss.kujiale.com/2018/04/19/LLLRDEQKAEBKKVRXAAAAAEI8_80x80.png',
            name: 'CMDB'
          },
          {
            iconUrl: 'https://qhyxpicoss.kujiale.com/2018/04/19/LLLRDEQKAEBKKVRXAAAAAEI8_80x80.png',
            name: 'CMDB'
          },
        ]
      },
      {
        depart: '研发',
        sites: [
          {
            iconUrl: 'https://qhyxpicoss.kujiale.com/2018/04/19/LLLRDEQKAEBKKVRXAAAAAEI8_80x80.png',
            name: 'CMDB'
          },
          {
            iconUrl: 'https://qhyxpicoss.kujiale.com/2018/04/19/LLLRDEQKAEBKKVRXAAAAAEI8_80x80.png',
            name: 'CMDB'
          },
          {
            iconUrl: 'https://qhyxpicoss.kujiale.com/2018/04/19/LLLRDEQKAEBKKVRXAAAAAEI8_80x80.png',
            name: 'CMDB'
          },
        ]
      },
      {
        depart: '运营',
        sites: [
          {
            iconUrl: 'https://qhyxpicoss.kujiale.com/2018/04/19/LLLRDEQKAEBKKVRXAAAAAEI8_80x80.png',
            name: 'CMDB'
          },
          {
            iconUrl: 'https://qhyxpicoss.kujiale.com/2018/04/19/LLLRDEQKAEBKKVRXAAAAAEI8_80x80.png',
            name: 'CMDB'
          },
          {
            iconUrl: 'https://qhyxpicoss.kujiale.com/2018/04/19/LLLRDEQKAEBKKVRXAAAAAEI8_80x80.png',
            name: 'CMDB'
          },
        ]
      }
    ]
  }
})
router.get('/api/user/site', async (ctx) => {
  ctx.body = {
    "success": true,
    "message": "success",
    "data": [
      {
        url: 'https://www.baidu.com/',
        title: '百度',
        color: 0,
      },
      {
        url: 'https://www.taobao.com/',
        title: '淘宝',
        color: 1,
      },
      {
        url: 'https://www.tencent.com/',
        title: '腾讯',
        color: 2,
      },
      {
        url: 'https://www.taobao.com/',
        title: 'google',
        color: 3,
      }
    ],
  }
})
router.post('/api/user/site', async (ctx) => {
  ctx.body = {
    "success": true,
    "message": "success",
    "data": [
    ],
  }
})
app.use(router.routes())
  .use(router.allowedMethods());

app.listen(5000);
