import utils from '../../../tools/utils'
import services from '../../../shared/services'

export default async (bot, user, event, state) => {
  const reminders = await services.User.getAllReminder(user.id)
  if (utils.isEmpty(reminders)) {
    await bot.send([{
      type: 'text',
      text: '登録されてるリマインダーがないよ。'
    }])
    return
  }
  await services.User.setState(user.id, 'selectReminder')
  const remindersText = reminders.map((reminder, index) => {
    let text = `(${index + 1})`
    if (reminder.time) {
      const time = utils.utcToJst(reminder.time, 'HH:mm')
      text += ` ${time}`
    }
    text += `\n${reminder.name}`
    return text
  }).join('\n\n')
  await bot.send([{
    type: 'text',
    text: `[一覧]\n${remindersText}`
  }, {
    type: 'text',
    text: '編集・削除する場合は対象の番号を教えてね'
  }])
}
