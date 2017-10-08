import utils from '../../../tools/utils'
import services from '../../../shared/services'

export default async (bot, data) => {
  if (utils.isEmpty(data.time)) {
    console.log(Error(`data.time is empty(data: ${JSON.stringify(data)})`))
    return
  }
  const utcStr = utils.jstToUtc(data.time, 'HH:mm')
  await services.User.setRemindTime(data.reminderId, utcStr)
  const reminder = await services.User.getReminder(data.reminderId)
  const jstStr = utils.utcToJst(reminder.time, 'H時m分')
  await bot.send([{
    type: 'text',
    text: `は〜い、「${reminder.name}」を ${jstStr} に知らせるね`
  }])
}