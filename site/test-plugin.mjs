export default function () {
  return {
    'mcfly:page:rendered': () => console.log('>>> page rendered'),
    'mcfly:scripts:evaluated': () => console.log('>>> scripts evaluated'),
    'mcfly:fragments:injected': () => console.log('>>> fragments injected'),
    'mcfly:elements:injected': () => console.log('>>> elements injected'),
  }
}
