export default function Tag({ type, value }) {
  const colors = {
    category: {
      Суші: 'bg-blue-100 text-blue-800',
      Піца: 'bg-red-100 text-red-800',
      Бургери: 'bg-yellow-100 text-yellow-800',
      Салати: 'bg-green-100 text-green-800',
    },
    cuisine: {
      Японська: 'bg-purple-100 text-purple-800',
      Італійська: 'bg-pink-100 text-pink-800',
      Американська: 'bg-orange-100 text-orange-800',
      Здорова: 'bg-emerald-100 text-emerald-800',
    },
  }

  const baseStyle = 'px-2 py-1 rounded text-xs font-medium'
  const colorStyle = colors[type]?.[value] || 'bg-gray-100 text-gray-800'

  return <span className={`${baseStyle} ${colorStyle}`}>{value}</span>
}
