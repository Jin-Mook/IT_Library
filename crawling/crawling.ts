import axios from 'axios'
import * as cheerio from 'cheerio'
import { createObjectCsvWriter } from 'csv-writer'

// 처음 크롤링 할때 path 부분의 csv 파일이름, axios 주소의 숫자, PageNumber 범위, 카테고리를 바꿔줘야한다. 

const csvHeader = ['id', 'bookName', 'bookCategory', 'bookImgUrl', 'bookWriter', 'bookPub', 'bookPubDate', 'bookPrev']
const csvWriterHeader = csvHeader.map(el => {
  return {id: el, title: el}
})
const csvWriter = createObjectCsvWriter({
  path: './OS_데이터베이스.csv',
  header: csvWriterHeader,
  append: true
})

// 책 링크들을 담는 배열을 만드는 함수
async function getBookLinks() {
  let lastPageNum: number
  const urlArray: string[] = [];
  const html = await axios.get('http://www.yes24.com/24/Category/Display/001001003025')
  let $ = cheerio.load(html.data)

  // 마지막 페이지번호
  const lastPageNumUrl = $('.yesUI_pagenS .end').attr('href') as string
  const equalIndexNum = lastPageNumUrl?.indexOf('=')
  
  if (equalIndexNum) {
    lastPageNum = +lastPageNumUrl?.slice(equalIndexNum+1) 

    for (let i: number =1; i<=lastPageNum; i++) {
      console.log('page: ', i)
      const bookListHtml = await axios.get(`http://www.yes24.com/24/Category/Display/001001003025?PageNumber=${i}`)
      let $ = cheerio.load(bookListHtml.data)    
      const $liTags = $('.clearfix').children('li')
      $liTags.each((i, el) => {
        urlArray.push($(el).find('.goods_name a').attr('href') as string)
      })
    }
  }
  return urlArray
}

// 책 상세 정보들을 가져오는 함수
async function getBookInfo(links: string[]) {
  const books: object[] = []
  let id: number = 1
  for (const link of links) {

    const html = await axios.get(`http://www.yes24.com${link}`)
    const $ = cheerio.load(html.data)
    // 책 이미지
    const bookImgUrl = $('.gd_img .imgBdr img').attr('src')
  
    // 책 제목
    const bookName = $('.gd_titArea .gd_name').text()
  
    // 책 저자, 출판사, 출판일
    const bookInfo = $('.gd_pubArea')
    const bookWriter = bookInfo.find('.gd_auth a').first().text() || bookInfo.find('.gd_auth').first().text().trim()
    const bookPub = bookInfo.find('.gd_pub a').text()
    let bookPubDate = bookInfo.find('.gd_date').text()
    bookPubDate = bookPubDate.replace('년 ', '-').replace('월 ', '-').replace('일', '')
  
    // 책 소개
    const bookPrev = $('.infoWrap_txtInner textarea').first().text()

    const book = {id, bookName, bookCategory: 'OS/데이터베이스', bookImgUrl, bookWriter, bookPub, bookPubDate, bookPrev}
    books.push(book)
    id++
  }
  await csvWriter.writeRecords(books)
}


const result = await getBookLinks()

await getBookInfo(result)
