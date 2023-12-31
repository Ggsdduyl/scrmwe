import request from '@/utils/request'
const wecom = window.CONFIG.services.wecom
const service = wecom + '/portrait'

//  根据客户id和当前企业员工id获取客户详细信息
export function getCustomerInfo(params) {
  return request({
    url: service + '/findWeCustomerInfo',
    params
  })
}
// 客户画像资料更新
export function getWeCustomerInfo(data) {
  return request({
    url: service + '/updateWeCustomerInfo',
    method: 'post',
    data: {
      externalUserid: data.externalUserid, // 客户Id
      userId: data.userId, // 员工Id
      remarkMobiles: data.remarkMobiles, // 手机号
      birthday: data.birthday, // 客户生日
      email: data.email, // 邮箱
      address: data.address, // 地址
      qq: data.qq, // qq
      position: data.position, // 职业
      remarkCorpName: data.remarkCorpName, // 公司
      description: data.description // 其他描述
    }
  })
}
//
/**
 * 获取当前系统所有可用标签
 * @param {*} params
 * groupTagType	是	1:企业客户标签;3:个人标签
userId	员工的id	当groupTagType为3的时候需要传该字段
 * @returns
 */
export function getAllTags(params) {
  return request({
    url: service + '/findAllTags',
    params
  })
}
//
/**
 * 更新客户画像标签
 * @param {*} data
 * {
    "externalUserid": "wmiGuBCgAApTcSW-3caqljFmKhm0r-bQ",//客户id
    "userId": "ShengXiYong",//当前员工id
    "isCompanyTag": false,//是否是企业标签true是;false:不是
    "addTag": [
        {
            "tagId": "1471332704915922947"//标签id
        }
    ]
}
 * @returns
 */
export function updateWeCustomerPorTraitTag(data) {
  return request({
    url: service + '/updateWeCustomerPorTraitTag',
    method: 'post',
    data
  })
}
// 查看客户添加的员工
export function findAddaddEmployes(params) {
  return request({
    url: service + '/findAddaddEmployes/' + params
  })
}
//  获取用户添加的群
export function findAddGroupNum(params) {
  return request({
    url: service + '/findAddGroupNum',
    params
  })
}
//  获取轨迹信息
/**
 *
 * @param {*}
  {
    pageNum:
pageSize:
trajectoryType: 轨迹类型(1:客户动态;2:员工动态;3:互动动态;4:跟进动态)
userId: 员工的id
externalUserid: 客户id
  }
 * @returns
 */
export function findTrajectory(params) {
  return request({
    url: service + '/findTrajectory',
    params
  })
}

/**
 * 编辑跟进动态
 * @param {*} data
 * {
    "externalUserid":"客户id",
    "trackState":1,//1:待跟进;2:跟进中;3:已成交;4:无意向;5:已流失
    "content":"根据内容",
    "userId":"员工id"

}
 * @returns
 */
export function addOrEditWaitHandle(data) {
  return request({
    url: service + '/addOrEditWaitHandle',
    method: 'post',
    data
  })
}
//  删除轨迹
export function removeTrajectory(params) {
  return request({
    url: service + '/removeTrajectory/' + params,
    method: 'delete'
  })
}
//  完成待办
export function handleWait(params) {
  return request({
    url: service + '/handleWait/' + params,
    method: 'delete'
  })
}

/**
 * 客户画像个人标签新增或更新
 * @param {*} params
{
    "weTags": [
        {
            "name": "个人标签4",//标签名
            "tagId": "1471327409208647681",//标签id，新增不存在则不传，更新则传
            "owner":"shengxiyong"//标签所属人id
        }
    ]
}
 * @returns
 */
export function addOrUpdatePersonTags(data) {
  return request({
    url: service + '/addOrUpdatePersonTags',
    method: 'post',
    data
  })
}

/**
 * 删除个人标签
 * @ids {*} ids	标签id,多个用逗号隔开
 * @returns
 */
export function deletePersonTag(ids) {
  return request({
    url: service + '/deletePersonTag/' + ids,
    method: 'delete'
  })
}

/**
 * 同步轨迹动态
 * @param {*} userId
 * @returns
 */
export function sync(userId) {
  return request({
    url: service + '/synchMomentsInteracte/' + userId,
    method: 'get'
  })
}
