const app = getApp(),
      common = require('../lib/common.js'),
      appData = app.globalData,
      user_id = wx.getStorageSync('user_id');
      
Page({
  data: {
    token:"",
    selected: true,
    selected1: false,
    index: 0,

  //20190717添加
    mySex:['男','女'],
    objectMySex:[{id:1,name:'男'},{id:2,name:'女'}],
    myArea:['南区','北区'],
    objectMyArea:[{id:1,name:'南区'},{id:2,name:'北区'}],
    myStudyStyle:['独立思考','交流探讨'],
    objectMyStudyStyle:[{id:1,name:'独立思考'},{id:2,name:'交流探讨'}],

    hisSex:['男','女','不介意'],
    objectHisySex:[{id:1,name:'男'},{id:2,name:'女'},{id:3,name:'不介意'}],
    hisArea:['南区','北区','不介意'],
    objectHisArea:[{id:1,name:'南区'},{id:2,name:'北区'},{id:3,name:'不介意'}],
    hisStudyStyle:['独立思考','交流探讨','不介意'],
    objectHisStudyStyle:[{id:1,name:'独立思考'},{id:2,name:'交流探讨'},{id:3,name:'不介意'}],




    subject: ['政治', '高数', '专业课', '英语'],
    objectSubject: [{ id: 1, name: '政治' }, { id: 2, name: '高数' }, { id: 3, name: '专业课' }, { id: 4, name: '英语' }],
    majorType: ['学硕', '专硕', '不确定'],
    objectMajorType: [ { id: 1, name: '学硕' }, { id: 2, name: '专硕' }, { id: 3, name: '不确定' }],
    hismajorType: ['学硕', '专硕', '不介意'],
    objecthismajorType: [ { id: 1, name: '学硕' }, { id: 2, name: '专硕' }, { id: 3, name: '不介意' },
    ],
    hisPurposeProvince: ['同省', '不介意'],
    objectHisPurposeProvince: [ { id: 1, name: '同省' }],
    hisPurposeUnv: ['同院校', '不介意'],
    objectHisPurposeUnv: [ { id: 1, name: '同院校', }],
    hisPurposeMajor: ['同专业', '不介意'],
    objectHispurposeMajor: [ { id: 1, name: '同专业' }, { id: 2, name: '不介意' }],

    statusBarHeight: app.globalData.statusBarHeight,
    statusBarHeight2: app.globalData.statusBarHeight + app.globalData.statusBarHeight
  },
  onLoad: function (options) {

  },

  //获取点击数据
  //20190717添加
  my_sex: function (e) {
    this.setData({
      my_sex: e.detail.value,
      sex: this.data.mySex[e.detail.value]
    })
  },
  my_area: function (e) {
    this.setData({
      my_area: e.detail.value,
      area: this.data.myArea[e.detail.value]
    })
  },
  my_study_style: function (e) {
    this.setData({
      my_study_style: e.detail.value,
      study_style: this.data.myStudyStyle[e.detail.value]
    })
  },
  his_sex: function (e) {
    this.setData({
      his_sex: e.detail.value,
      sex: this.data.hisSex[e.detail.value]
    })
  },
  his_area: function (e) {
    this.setData({
      his_area: e.detail.value,
      area: this.data.hisArea[e.detail.value]
    })
  },
  his_study_style: function (e) {
    this.setData({
      his_study_style: e.detail.value,
      study_style: this.data.hisStudyStyle[e.detail.value]
    })
  },




  my_good_subject: function (e) {this.setData({my_good_subject: e.detail.value,good_subject: this.data.subject[e.detail.value]})
  },
  my_school_type: function (e) {
    this.setData({
      my_school_type: e.detail.value,
      school_type: this.data.majorType[e.detail.value]
    })
  },
  his_good_subject: function (e) { this.setData({ his_good_subject: e.detail.value, good_subject: this.data.subject[e.detail.value] }) },
  his_school_place: function (e) { this.setData({ his_school_place: e.detail.value, school_place: this.data.hisPurposeProvince[e.detail.value] }) },
  his_school_name: function (e) { this.setData({ his_school_name: e.detail.value, school_name: this.data.hisPurposeUnv[e.detail.value] }) },
  his_school_field: function (e) { this.setData({ his_school_field: e.detail.value, school_field: this.data.hisPurposeMajor[e.detail.value] }) },
  his_school_type: function (e) { this.setData({ his_school_type: e.detail.value, school_type: this.data.hismajorType[e.detail.value] }) },

  my_hometown: function () { common.navTo('../test/test?id=1') },
  my_school_place: function () { common.navTo('../test/test?id=2') },
  my_school_name: function () { common.navTo('../test/test?id=5') },
  my_school_field: function () { common.navTo('../test/test?id=6') },
  his_hometown: function () { common.navTo('../test/test?id=3') },
onShow:function(){
  this.setData({
    my_hometown: wx.getStorageSync('my_hometown'),
    my_school_place: wx.getStorageSync('my_school_place'),
    my_school_field: wx.getStorageSync('my_school_field'),
    my_school_name: wx.getStorageSync('my_school_name'),
    his_hometown: wx.getStorageSync('his_hometown')
  })
},

//保存个人信息
  personsl_details: function (e) {
    const fData = e.detail.value,
          that = this,
          data = that.data,
          userInfoStr = wx.getStorageSync("userInfoStr"),
          myData = {
            "name": userInfoStr.nickName,
            "phone": fData.phone,
            "sex": fData.my_sex,
            "hometown": data.my_hometown,
            "area": fData.my_area,
            "school_place": data.my_school_place,
            "school_name": data.my_school_name,
            "school_field": data.my_school_field,
            "school_type": data.school_type,
            "study_style": fData.my_study_style,
            "good_subject": data.good_subject
          };
    //个人信息
    let baseInfoUrl = app.BASE_URL + '/api/user/baseinfo'
    const token = wx.getStorageSync('token')
    app.request(baseInfoUrl, 'POST', myData,res=>{
      console.log(res.data)
      wx.setStorageSync('user_id', res.data.user_id)
      if(res.data.message){
          if(res.data.errors){
            let errPhone = res.data.errors.phone
            let msg = res.data.message
            errPhone ? wx.showToast({
              title: errPhone[0],
              icon: 'none',
              duration: 1500
            }) : wx.showToast({
              title: msg,
              icon: 'none',
              duration: 1500
            }); 
          }else{
            this.setData({
              selected: false,
              selected1: true
            })
          }
      }
    },fail=>{}, { 'Authorization': 'Bearer' + token },'')
  },
  RD_expect: function (e) {
    const fData = e.detail.value,
      that = this,
      data = that.data,
      hisData = {
        "sex": fData.his_sex,
        "hometown": data.his_hometown,
        "area": fData.his_area,
        "school_place": data.school_place,
        "school_name": data.school_name,
        "school_field": data.school_field,
        "school_type": data.school_type,
        "study_style": fData.his_study_style,
        "good_subject": data.good_subject
    };
    console.log(hisData)
    that.setData({
      selected: false,
      selected1: true
    })
    let targetInfoUrl = app.BASE_URL + '/api/user/targetinfo'
    const token = wx.getStorageSync('token')
    app.request(targetInfoUrl, 'POST', hisData, res => {
      console.log(res)
      let msg = res.data.message
      if(res.data.errors){
        // wx.setStorageSync('fill_in_info', false)
        wx.showToast({
          title: res.data.errors,
          icon: 'none',
          duration: 3000
        });
      }else{
        // wx.setStorageSync('fill_in_info', true)
        wx.setStorageSync('toRecommend', true)
      }
      // if(res.data.message){
      //   let msg = res.data.message
      //   wx.showToast({
      //     title: msg,
      //     icon: 'none',
      //     duration: 3000
      //   });
      // }


        //测试，未启用(判断是否预热期跳转页面)
     var is_warm = wx.getStorageSync('is_warm');
      if (!res.data.errors) {
        is_warm ? common.navTo('../countdown/countdown') : common.navTo('../recommend/recommend')
      }
    }, fail => {}, { 'Authorization': 'Bearer' +token }, '')
  },
  toExpect: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  //后期删除
  selected:function(){
    this.setData({
      selected:true,
      selected1:false
    })
  },
  selected1: function () {
    this.setData({
      selected: false,
      selected1: true
    })
  }
})