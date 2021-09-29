<template>
   <div id="singer-container">
     <div class="singType">
       <h3>选择歌手类型:</h3>
       <el-tag  class="tag-type" :class="{active:currtIndexType==item.num}" v-for="(item ,index) in type" :key="index" @click="chooseType(item.num)">{{item.types}}</el-tag>
     </div>
      <div class="areaType">
        <h3>选择歌手地区:</h3>
       <el-tag  class="tag-type" :class="{active:currtIndexArea==item.num}" v-for="(item ,index) in area" :key="index" @click="chooseArea(item.num)">{{item.areas}}</el-tag>
     </div>
    <div class="tag-singer">
      <h3 class="choosesinger-h3">选择歌手:</h3>
      <el-button type="danger" class="clear" size="mini" @click="clearchoose">清空</el-button>
      <div class="cleardiv"></div>
       <el-tag  class="tag-type" :class="{active:currtIndexSinger==item.id}" v-for="(item) in songerList" :key="item.id" @click="chooseSinger(item.id)">{{item.name}}</el-tag>
    </div>
   
    <!-- 歌曲 -->
    <div v-show="singHotList.length>0">
       <!-- 歌手信息 -->
    <div class="singInfo">
      <div class="img-left"><img :src="singCover" alt=""></div>
      <div class="introduce-right">
        <ul>
          <li><h3 class="singName">{{singName}}</h3></li>
          <li v-show="singImg!==''"><img class="ruzhuImg"  :src="singImg" >&nbsp;&nbsp;<span class="other">入驻歌手</span></li>
          <li  v-show="singerBir!==''"> <span>出生日期：{{singerBir|dateFormat}}</span></li>
          <li><p><span class="Desc">{{singerDesc}}</span></p></li>
        </ul>
      </div>
    </div>  
    <div class="clearItem"></div>
      <div class="item">
        <el-tabs type="border-card">
    <el-tab-pane label="歌曲"><Song :songListInfo="singHotList"></Song></el-tab-pane>
    <el-tab-pane label="mv">
      <div class="mv">
 <div class="mvimg" v-for="item in singerMv" :key="item.id" @click="openMv(item.id)"><span>{{item.name}}</span> <img  :src="item.imgurl" class="mvimg" alt=""></div>
      <div class="clearItem"></div>
      </div>
    
    </el-tab-pane>
    
    </el-tabs>
      </div>
    </div>
   
    <div class="liubai"></div>
   </div>
</template>

<script>
import Song from '../song-list/song.vue'
export default {
   data(){
     return{
       //-1全部，1男歌手，2女歌手，3乐队
       type:[{types:'全部',num:-1},{types:'男歌手',num:1},{types:'女歌手',num:2},{types:'乐队',num:3}],
      //  -1:全部,7华语,96欧美,8:日本,16韩国,0:其他
       area:[{areas:'全部',num:-1},{areas:'华语',num:7},{areas:'欧美',num:96},{areas:'日本',num:8},{areas:'韩国',num:16},{areas:'其他',num:0}],
      queryType:'',
      queryArea:'',
      //获取到的歌手信息
      songerList:[],
      currtIndexType:'',
      currtIndexArea:99,
      currtIndexSinger:'',
      //歌手热门50首歌曲
      singHotList:[],
      singerinfo:[],
      singCover:'',
      singName:'',
      singImg:'',
      singerBir:'',
      singerDesc:'',
      singerMv:[]
    }
   },
  methods:{
    async chooseType(num){
     this.queryType=num
     this.currtIndexType=num
     console.log(this.queryType);
     if(this.queryArea==''){
     const {data:res}=await  this.$http.get(`/artist/list?type=${this.queryType}&limit=50`)
     this.songerList=res.artists
     }else{
     const {data:res}=await this.$http.get(`/artist/list?type=${this.queryType}&area=${this.queryArea}&limit=50`)
       this.songerList=res.artists
     }
   },
    async chooseArea(num){
     this.queryArea=num
     this.currtIndexArea=num
   
     if(this.queryType==''){
       const {data:res}=await this.$http.get(`/artist/list?area=${this.queryArea}&limit=50`)
     this.songerList=res.artists
     }else{
        const {data:res}=await this.$http.get(`/artist/list?type=${this.queryType}&area=${this.queryArea}&limit=50`)
     this.songerList=res.artists
   
     }
   },
 async chooseSinger(id){
    this.currtIndexSinger=id
    const {data:res}=await this.$http.get(`/artist/top/song?id=${id}`)
    this.singHotList=res.songs
    //获取歌手信息
    const {data:info}=await this.$http.get(`/artist/detail?id=${id}`)
    this.singerinfo=info.data
    
    this.singCover=this.singerinfo.artist.cover
    this.singName=this.singerinfo.artist.name
    this.singerDesc=this.singerinfo.artist.briefDesc
    if('identify' in info.data){
       this.singImg=this.singerinfo.identify.imageUrl
    }else{
       this.singImg=''
    }
   if('user' in info.data){
    
      this.singerBir=this.singerinfo.user.birthday
     
    }else{
       this.singerBir=''
    }
    //获取歌手mv
    const {data:mv}=await this.$http.get(`/artist/mv?id=${id}`)
    this.singerMv=mv.mvs
   
  },
  openMv(id){

   this.$router.push(`/mvPlay/${id}`)
  },
  
  clearchoose(){
    this.queryType=''
    this.queryArea=''
    this.currtIndexType=''
    this.currtIndexArea=99
    this.songerList=''
  }
  },
 components:{
      Song
    }
}
</script>

<style scoped>
.tag-type{
  width: 130px;
  margin-right: 20px;
  text-align: center;
   white-space: nowrap; 
  
  overflow: hidden;
  text-overflow:ellipsis;
}
.active{
  background-color: rgb(240, 121, 121);
}
h3{
  color: brown !important;;
}
.choosesinger-h3{
  display: inline-block;
  float: left;
}
.clear{
  float: left;
  margin-left: 20px;
  margin-top: 10px;
}
.cleardiv{
  clear: both;
}
.liubai{
  clear: both;
  height: 100px;
}
.img-left img{
  width: 360px;
  height: 320px;
  border-radius: 20px;
  float: left;
}
ul{
  margin-top: 20px;
}
ul li{
  height: 40px;
  list-style: none;
}
.introduce-right{
  float: left;
  margin-left: 30px;
}
.ruzhuImg{
  width: 23px;
  height: 23px;
  vertical-align: middle;
}
.singName{
  font-size: 28px;
}
.other{
  font-size: 10px;
}
ul li span{
  font-size: 15px;
 font-weight: bold;
}
.Desc{
  width: 380px;
  overflow: hidden;
	 text-overflow: ellipsis;
	 display: -webkit-box;
	 -webkit-line-clamp: 6;/*想省略几行就写几*/
	 -webkit-box-orient: vertical;

}
.singInfo{
  margin-bottom: 20px;
}
.clearItem{
  clear: both;
  height: 30px;
}
.mv{
  margin-left: 60px;
}
.mvimg{

  float: left;
  width: 200px;
  height: 200px;
  margin-right: 20px;
  margin-bottom: 30px;
  border-radius: 10px;
}
.mvimg span{
 
  display: inline-block;

  margin-bottom: -20px;
  width: 160px;
  height: 30px;
  line-height: 30px;
   white-space: nowrap; 
  font-size: 15px;
  overflow: hidden;
  text-overflow:ellipsis;
  font-weight: bold;

}
</style>