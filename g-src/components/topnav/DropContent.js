export const buildDropContent = function (object) {
  var items = []
  for (var key in object) {
    items.push({
      icon: 'bx bx-package',
      content: key + ':' + object[key],
    })
  }
  return items
}

export const renderNotificationItem = (item, index) => (
  <div className='notification-item' key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
)

export const contentNumber = (e) => {
  var i = 0
  for (var key in e) {
    i++
  }
  return i
}
