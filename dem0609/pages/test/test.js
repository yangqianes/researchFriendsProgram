const app = getApp(),
      header = { 'content-type': 'application/x-www-foorm-urlencoded' };
var my_hometown = wx.getStorageSync('my_hometown'),
    my_school_name = wx.getStorageSync('my_school_name'),
    my_school_place = wx.getStorageSync('my_school_place'),
    my_school_field = wx.getStorageSync('my_school_field'),
    his_hometown = wx.getStorageSync('his_hometown'),
    my_school_field_single = wx.getStorageSync('my_school_field_single'),
  gitUrl = 'https://yanyou.uliuli.fun/school/'; 
Page({
  data: {
    optedCityId:0,
    province:true,
    unv:false,
    major:false,
    letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z","#"],
    cityListId: '',
    citylist: [
      { "letter": "A", "data": [{ "id": "a1", "cityName": "安徽省" }] },
      { "letter": "B", "data": [{ "id": "b1", "cityName": "北京市" }] },
      { "letter": "C", "data": [{ "id": "c1", "cityName": "重庆市" }] },
      { "letter": "F", "data": [{ "id": "f1", "cityName": "福建省" }] },
      {
        "letter": "G", "data": [{ "id": "g1", "cityName": "贵州省" },
        { "id": "g2", "cityName": "甘肃省" },
        { "id": "g3", "cityName": "广东省" },
        { "id": "g4", "cityName": "广西壮族自治区" }]
      },
      {
        "letter": "H", "data": [{ "id": "h1", "cityName": "河北省" },
        { "id": "h2", "cityName": "河南省" },
        { "id": "h3", "cityName": "湖北省" },
        { "id": "h4", "cityName": "湖南省" },
        { "id": "h5", "cityName": "海南省" },
        { "id": "h6", "cityName": "黑龙江省" }]
      },
      {
        "letter": "J", "data": [{ "id": "j1", "cityName": "吉林省" },
        { "id": "j2", "cityName": "江苏省" },
        { "id": "j3", "cityName": "江西省" }]
      },
      { "letter": "L", "data": [{ "id": "l1", "cityName": "辽宁省" }] },
      {
        "letter": "N", "data": [{ "id": "n1", "cityName": "内蒙古自治区" },
        { "id": "n2", "cityName": "宁夏回族自治区" }]
      },
      { "letter": "Q", "data": [{ "id": "q1", "cityName": "青海省" }] },
      {
        "letter": "S", "data": [{ "id": "s1", "cityName": "山西省" },
        { "id": "s2", "cityName": "山东省" },
        { "id": "s3", "cityName": "上海市" },
        { "id": "s4", "cityName": "四川省" },
        { "id": "s5", "cityName": "陕西省" }]
      },
      { "letter": "T", "data": [{ "id": "t1", "cityName": "天津市" }] },
      {
        "letter": "X", "data": [{ "id": "x1", "cityName": "西藏自治区" },
        { "id": "x2", "cityName": "新疆维吾尔自治区" }]
      },
      { "letter": "Y", "data": [{ "id": "y1", "cityName": "云南省" }] },
      { "letter": "Z", "data": [{ "id": "z1", "cityName": "浙江省" }] }],

    schoolList:[],
    schoolId:"",
    majorList:[],
    majorId:"",
    
    statusBarHeight: app.globalData.statusBarHeight,
    statusBarHeight2: app.globalData.statusBarHeight + app.globalData.statusBarHeight
  },
  onLoad: function (option) {
    const that = this;
    let optedCityId = option.id
    that.setData({
      optedCityId: optedCityId
    })
  },
  cityTap(e) {
    const val = e.currentTarget.dataset.val || '',
    Index = e.currentTarget.dataset.index || '';
    const that = this;
    let city = this.data.citySel;
    var cityInedx = parseInt(that.data.optedCityId);

    function cache(city, num, stroageName1, stroageValue1, stroageName2, stroageValue2){
      if (city === num) {
        wx.setStorageSync(stroageName1, stroageValue1);
        if(arguments.length>4){
          wx.setStorageSync(stroageName2, stroageValue2);
        }
      }
    }
    cache(cityInedx, 1, "my_hometown", val.cityName);
    cache(cityInedx, 2, "my_school_place", val.cityName, "school_placeId", val.id);
    cache(cityInedx, 3, "his_hometown", val.cityName)
    cache(cityInedx, 5, "my_school_name", val.schoolName)
    cache(cityInedx, 6, "my_school_field", val.major)
    cache(cityInedx, 7, "my_school_field_single", val.major)
    wx.navigateBack({ changed: true })
  },
  letterTap(e) {
    const Item = e.currentTarget.dataset.item;
    console.log(e.currentTarget)
    console.log(e.currentTarget.dataset)
    this.setData({
      cityListId: Item,
      schoolId: Item
    });
  },
  onShow() {
    const that = this,
          school_placeId = wx.getStorageSync('school_placeId');
    var cityInedx = parseInt(that.data.optedCityId);
    function changeView(id,num,pro,unv,major){
      if (id === num) {
        that.setData({
          province: pro,
          unv: unv,
          major: major
        })
      }
    }
    changeView(cityInedx, 7, false, false, true)
    changeView(cityInedx, 6, false, false, true)
    changeView(cityInedx,1||2||3,true,false,false)
    changeView(cityInedx, 5, false, true, false)

    //请求学校列表
    if (school_placeId !=""){
      app.request(gitUrl + school_placeId+'.js', 'GET', '', res => {
        let data1 = res.data;
        let data = JSON.parse(data1);
        for (let i = 0; i < data.length; i++) {
          if (school_placeId == data[i].id) {
            let school = data[i].schoolList
            that.setData({
              schoolList: school
            })
          }
        }
      }, res => {
        console.log("fail")
        },header, 'jsonp')
    }
    //请求专业列表
    app.request(gitUrl+'major.js', 'GET', '', res => {
        let data = JSON.parse(res.data);
        that.setData({
          majorList: data
        })
    }, res => {},header, 'jsonp')
  },
})