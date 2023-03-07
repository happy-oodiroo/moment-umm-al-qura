'use strict';

var chai = require('chai')
  , moment = require('./moment-umm-al-qura')

chai.should()

moment.locale('en'
, { week:
    { dow: 6
    , doy: 12
    }
  , longDateFormat:
    { LTS: 'h:mm:ss A'
    , LT: 'h:mm A'
    , L: 'iYYYY/iMM/iDD'
    , LL: 'iD iMMMM iYYYY'
    , LLL: 'iD iMMMM iYYYY LT'
    , LLLL: 'dddd, iD iMMMM iYYYY LT'
    }
  }
);

describe('moment', function() {

  describe('#parse', function() {

    it('should parse gregorian dates', function() {
      var m = moment('1981/8/17 07:10:20', 'YYYY/M/D hh:mm:ss')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('YYYY-MM-DD hh:mm:ss').should.be.equal('1981-08-17 07:10:20')
      m.milliseconds().should.be.equal(0)
    });

    it('should parse correctly when input is only time', function() {
      var m = moment('07:10:20', 'hh:mm:ss')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('YYYY-MM-DD hh:mm:ss').should.be.equal('0000-01-01 07:10:20')
    });

    it('should parse when only Hijri year is in the format', function() {
      var m = moment('08 1436 17', 'MM iYYYY DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('YYYY-MM-DD').should.be.equal('2014-08-17')
      m = moment('08 36 17', 'MM iYY DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('YYYY-MM-DD').should.be.equal('2014-08-17')
    });

    it(' should parse when Hijri year, month and date are in the format', function() {
      var m = moment('26 1430 5', 'iD iYYYY iM')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('YYYY-MM-DD').should.be.equal('2009-05-22')
    });

    it('should parse with complex format', function() {
      var m = moment('17 26 50 2014 50 8 12', 'D iD iYYYY YYYY M M jM')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('YYYY-MM-DD').should.be.equal('2014-12-17')
    });

    it('should parse format result', function() {
      var f = 'iYYYY/iM/iD hh:mm:ss.SSS a';
      var m = moment()
      console.log(m,m.format('iYYYY/iMM/iDD'));      
      moment(m.format(f), f).isSame(m).should.be.true
    });

    it('should be able to parse in utc', function() {
      var m = moment.utc('1436/8/20 07:10:20', 'iYYYY/iM/iD hh:mm:ss')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('YYYY-MM-DD hh:mm:ss Z').should.be.equal('2015-06-08 07:10:20 +00:00')
    });

    it('should parse with a format array', function() {
      var p1 = 'iYY iM iD'
        , p2 = 'iM iD iYY'
        , p3 = 'iD iYY iM',
         m;
      m = moment('60 11 12', ['D YY M', 'M D YY', 'YY M D']);
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('YY-MM-DD').should.be.equal('60-11-12') 
      m = moment('10 11 12', [p1, p2, p3])
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY-iMM-iDD').should.be.equal('10-11-12')
      m = moment('10 11 12', [p2, p3, p1])
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY-iMM-iDD').should.be.equal('12-10-11')
      m = moment('10 11 12', [p3, p1, p2])
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY-iMM-iDD').should.be.equal('11-12-10')
      m = moment('10 11 12', [p3, p2, p1])
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY-iMM-iDD').should.be.equal('11-12-10')
      m = moment('60-11-12', [p3, p2, p1])
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY-iMM-iDD').should.be.equal('60-11-12')
      m = moment('60 11 12', [p3, p2, p1])
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY-iMM-iDD').should.be.equal('60-11-12')
      m = moment('60 8 31', ['YY M D', 'iYY iM iD'])
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('YY-MM-DD').should.be.equal('60-08-31')
      m = moment('60 8 31', ['iYY iM iD', 'YY M D'])
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('YY-MM-DD').should.be.equal('60-08-31')
      m = moment('60 5 31', ['YY M D', 'iYY iM iD'])
      console.log(m,m.format('iYYYY/iMM/iDD'),m.format('YY M D'));
      m.format('YY-MM-DD').should.be.equal('60-05-31')
      m = moment('60 5 30', ['iYY iM iD', 'YY M D'])
      console.log(m,m.format('iYYYY/iMM/iDD'),m.format('iYY-iMM-iDD'));
      m.format('iYY-iMM-iDD').should.be.equal('82-12-29')
    })
  });

  describe('#format', function() {
    it('should work normally when there is no Hijri token', function() {
      var m = moment('1981-08-17 07:10:20', 'YYYY-MM-DD hh:mm:ss')
      console.log(m,m.format('YYYY-MM-DD hh:mm:ss'));
      m.format('YYYY-MM-DD hh:mm:ss').should.be.equal('1981-08-17 07:10:20')
    });

    it('should format to Hijri with Hijri tokens', function() {
      var m = moment('1981-08-17 07:10:20', 'YYYY-MM-DD hh:mm:ss')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD hh:mm:ss').should.be.equal('1401-10-16 07:10:20')
    });

    it('should format with escaped and unescaped tokens', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('[My] birt\\h \\y[ea]r [is] iYYYY or YYYY').should.be.equal('My birth year is 1401 or 1981')
    });

    it('should format with mixed tokens', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY/iMM/iDD = YYYY-MM-DD').should.be.equal('1401/10/16 = 1981-08-17')
    });

    it('should format with iMo', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iMo').should.be.equal('10th')
    });

    it('should format with iM', function() {
      var m = moment('1981-05-17', 'YYYY-MM-DD')// Note: The date is different here
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iM').should.be.equal('7')
    });

    it('should format with iMM', function() {
      var m = moment('1981-05-17', 'YYYY-MM-DD')// Note: The date is different here
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iMM').should.be.equal('07')
    });

    it('should format with iMMM', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iMMM').should.be.equal('Shw')
    });

    it('should format with iMMMM', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iMMMM').should.be.equal('Shawwal')
    });

    it('should format with iDo', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iDo').should.be.equal('16th')
    });

    it('should format with iD', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iD').should.be.equal('16')
    });

    it('should format with iDD', function() {
      var m = moment('1981-05-17', 'YYYY-MM-DD')// Note: The date is different here
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iDD').should.be.equal('12')
      m = moment('1981-05-13', 'YYYY-MM-DD')// Note: The date is different here
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iDD').should.be.equal('08')
    });

    it('should format with iDDD', function() {
      var m = moment('1981-11-17', 'YYYY-MM-DD')// Note: The date is different here
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iDDD').should.be.equal('20')
    });

    it('should format with iDDDo', function() {
      var m = moment('1981-11-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iDDDo').should.be.equal('20th')
    });

    it('should format with iDDDD', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iDDDD').should.be.equal('282')
      m = moment('1981-11-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iDDDD').should.be.equal('020')
    });

    it('should format with iwo', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iwo').should.be.equal('41st')
    });

    it('should format with iw', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iw').should.be.equal('41')
    });

    it('should format with iww', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iww').should.be.equal('41')
      m = moment('1981-11-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iww').should.be.equal('04')
    });

    it('should format with iYY', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY').should.be.equal('01')
    });

    it('should format with iYYYY', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY').should.be.equal('1401')
    });

    it('should format with iYYYYY', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYYY').should.be.equal('01401')
    });

    it('should format with igg', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('igg').should.be.equal('01')
    });

    it('should format with igggg', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('igggg').should.be.equal('1401')
    });

    it('should format with iggggg', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iggggg').should.be.equal('01401')
    });

    it('should work with long date formats too', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')// TODO: Not working
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('LTS').should.be.equal('12:00:00 AM')
      m.format('LT').should.be.equal('12:00 AM')
      m.format('L').should.be.equal('1401/10/16')
      m.format('l').should.be.equal('1401/10/16')
      m.format('LL').should.be.equal('16 Shawwal 1401')
      m.format('ll').should.be.equal('16 Shw 1401')
      m.format('LLL').should.be.equal('16 Shawwal 1401 12:00 AM')
      m.format('lll').should.be.equal('16 Shw 1401 12:00 AM')
      m.format('LLLL').should.be.equal('Monday, 16 Shawwal 1401 12:00 AM')
      m.format('llll').should.be.equal('Mon, 16 Shw 1401 12:00 AM')
    });
  });

  describe('#iConvert', function() {
    it('should convert 1999-04-01 to 1419-12-15', function() {
      var h = moment.iConvert.toHijri(1999, 3, 1);
      h.hy.should.be.equal(1419);
      h.hm.should.be.equal(11);
      h.hd.should.be.equal(14);
    });

    it('should convert 1989-02-25 to 1409-07-19', function() {
      var h = moment.iConvert.toHijri(1989, 1, 25);
      h.hy.should.be.equal(1409);
      h.hm.should.be.equal(6);
      h.hd.should.be.equal(18);
    });

    it('should convert 1419-12-15 to 1999-04-01', function() {
      var g = moment.iConvert.toGregorian(1419, 11, 15);
      g.gy.should.be.equal(1999);
      g.gm.should.be.equal(3);
      g.gd.should.be.equal(2);
    });

    it('should convert 1409-07-19 to 1989-02-25', function() {
      var g = moment.iConvert.toGregorian(1409, 6, 19);
      g.gy.should.be.equal(1989);
      g.gm.should.be.equal(1);
      g.gd.should.be.equal(26);
    });
  });

  describe('#startOf', function() {
    it('should work as expected without Hijri units', function() {
      var m = moment('2015-04-03 07:10:20')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.startOf('year').format('YYYY-MM-DD HH:mm:ss').should.be.equal('2015-01-01 00:00:00')
      m = moment('2015-04-03 07:10:20')
      m.startOf('month').format('YYYY-MM-DD HH:mm:ss').should.be.equal('2015-04-01 00:00:00')
      m = moment('2015-04-03 07:10:20')
      m.startOf('day').format('YYYY-MM-DD HH:mm:ss').should.be.equal('2015-04-03 00:00:00')
      m = moment('2015-04-03 07:10:20')
      m.startOf('week').format('YYYY-MM-DD HH:mm:ss').should.be.equal('2015-03-28 00:00:00')
    });

    it('should return start of Hijri year, month and date', function() {
      var m = moment('2015-04-03 07:10:20')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.startOf('iYear').format('iYYYY-iMM-iDD HH:mm:ss').should.be.equal('1436-01-01 00:00:00')
      m = moment('2015-04-03 07:10:20')
      m.startOf('iMonth').format('iYYYY-iMM-iDD HH:mm:ss').should.be.equal('1436-06-01 00:00:00')
      m = moment('2015-04-03 07:10:20')
      m.startOf('day').format('iYYYY-iMM-iDD HH:mm:ss').should.be.equal('1436-06-13 00:00:00')
      m = moment('2015-04-03 07:10:20')
      m.startOf('week').format('iYYYY-iMM-iDD HH:mm:ss').should.be.equal('1436-06-07 00:00:00')
    });
  });

  describe('#endOf', function() {
    it('should work as expected without Hijri units', function() {
      var m;
      m = moment(new Date(2015, 1, 2, 3, 4, 5, 6))
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.endOf('year').format('YYYY-MM-DD HH:mm:ss').should.be.equal('2015-12-31 23:59:59')
      m = moment(new Date(2015, 1, 2, 3, 4, 5, 6))
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.endOf('month').format('YYYY-MM-DD HH:mm:ss').should.be.equal('2015-02-28 23:59:59')
      m = moment(new Date(2015, 1, 2, 3, 4, 5, 6))
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.endOf('day').format('YYYY-MM-DD HH:mm:ss').should.be.equal('2015-02-02 23:59:59')
      m = moment(new Date(2015, 1, 2, 3, 4, 5, 6))
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.endOf('week').format('YYYY-MM-DD HH:mm:ss').should.be.equal('2015-02-06 23:59:59')
    });

    it('should return end of Hijri year, month and date', function() {
      var m = moment('2015-04-03 07:10:20')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.endOf('iYear').format('iYYYY-iMM-iDD HH:mm:ss').should.be.equal('1436-12-30 23:59:59')
      m = moment('2015-04-03 07:10:20')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.endOf('iMonth').format('iYYYY-iMM-iDD HH:mm:ss').should.be.equal('1436-06-30 23:59:59')
      m = moment('2015-04-03 07:10:20')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.endOf('day').format('iYYYY-iMM-iDD HH:mm:ss').should.be.equal('1436-06-13 23:59:59')
      m = moment('2015-04-03 07:10:20')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.endOf('week').format('iYYYY-iMM-iDD HH:mm:ss').should.be.equal('1436-06-13 23:59:59')
    });
  });

  describe('#iYear', function() {
    it('should return Hijri year', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.iYear().should.be.equal(1401)
    });

    it('should set Hijri year', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.iYear(1435)
      m.format('iYYYY/iM/iD').should.be.equal('1435/10/16')
      m = moment('2013-03-20', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY/iM/iD').should.be.equal('34/5/7')
      m.iYear(1392)
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY/iM/iD').should.be.equal('92/5/7')
    });

    it('should also has iYears alias', function() {
      moment.fn.iYear.should.be.equal(moment.fn.iYears)
    });

    it('should add years', function() {
      var m = moment('1409-07-18', 'iYYYY-iMM-iDD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.add(1, 'iYear')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD').should.be.equal('1410-07-18')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.add(4, 'iYear')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD').should.be.equal('1414-07-18')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.add(1, 'iYear')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD').should.be.equal('1415-07-18')
    });

    it('should subtract years', function() {
      var m = moment('1409-07-18', 'iYYYY-iMM-iDD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.subtract(1, 'iYear')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD').should.be.equal('1408-07-18')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.subtract(5, 'iYear')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD').should.be.equal('1403-07-18')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.subtract(1, 'iYear')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD').should.be.equal('1402-07-18')
    });
  });

  describe('#iMonth', function() {
    it('should return Hijri month', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.iMonth().should.be.equal(9)
    });

    it('should set Hijri month', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.iMonth(7)
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY/iM/iD').should.be.equal('1401/8/16')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m = moment('2012-08-21', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY/iM/iD').should.be.equal('33/10/2')
      m.iMonth(11)
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY/iM/iD').should.be.equal('33/12/2')
      m = moment('2013-08-22', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY/iM/iD').should.be.equal('34/10/14')
      m.iMonth(11)
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY/iM/iD').should.be.equal('34/12/14')
    });

    it('should also has iMonths alias', function() {
      console.log(moment.fn.iMonth);
      moment.fn.iMonth.should.be.equal(moment.fn.iMonths)
    });

    it('should set month by name and short name', function() {
      var m = moment(new Date(2015, 0, 1))
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.iMonth('Shawwal')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY/iM/iD').should.be.equal('1436/10/9')

      m = moment(new Date(2015, 0, 1))
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.iMonth('Safar')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY/iM/iD').should.be.equal('1436/2/9')

      m = moment(new Date(2015, 0, 1))
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.iMonth('Jum-I')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY/iM/iD').should.be.equal('1436/5/9')
    });

    it('should add months', function() {
      var m = moment('1409-07-18', 'iYYYY-iMM-iDD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.add(1, 'iMonth')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD').should.be.equal('1409-08-18')
      m.add(4, 'iMonth')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD').should.be.equal('1409-12-18')
      m.add(1, 'iMonth')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD').should.be.equal('1410-01-18')
    });

    it('should subtract months', function() {
      var m = moment('1409-07-18', 'iYYYY-iMM-iDD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.subtract(1, 'iMonth')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD').should.be.equal('1409-06-18')
      m.subtract(5, 'iMonth')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD').should.be.equal('1409-01-18')
      m.subtract(1, 'iMonth')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD').should.be.equal('1408-12-18')
    });
  });

  describe('#iDate', function() {
    it('should return Hijri date', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.iDate().should.be.equal(16)
    });

    it('should set Hijri date', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.iDate(29)
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY/iM/iD').should.be.equal('1401/10/29')
      m = moment('1981-07-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY/iM/iD').should.be.equal('01/9/15')
      m.iDate(29)
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY/iM/iD').should.be.equal('01/9/29')
      m.iDate(30)
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY/iM/iD').should.be.equal('01/9/30')
      m.iDate(30)
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY/iM/iD').should.be.equal('01/9/30')
      m.iDate(31)
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY/iM/iD').should.be.equal('01/10/1')
      m.iDate(90)
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY/iM/iD').should.be.equal('02/1/2')
    });

    it('should also has iDates alias', function() {
      console.log(moment.fn.iDate);
      moment.fn.iDate.should.be.equal(moment.fn.iDates)
    })

    it('should add days', function() {
      var m = moment('1409-07-18', 'iYYYY-iMM-iDD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.add(1, 'iDate')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD').should.be.equal('1409-07-19')
      m.add(10, 'iDate')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD').should.be.equal('1409-07-29')
      m.add(1, 'iDate')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD').should.be.equal('1409-08-01')
    });

    it('should subtract days', function() {
      var m = moment('1409-07-18', 'iYYYY-iMM-iDD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.subtract(1, 'iDate')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD').should.be.equal('1409-07-17')
      m.subtract(10, 'iDate')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD').should.be.equal('1409-07-07')
      m.subtract(7, 'iDate')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY-iMM-iDD').should.be.equal('1409-06-30')
    });
  });

  describe('#iDayOfYear', function() {
    it('should return Hijri date of year', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'),m.iDayOfYear());
      m.iDayOfYear().should.be.equal(282)
      m = moment('1980-11-9', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'),m.iDayOfYear());
      m.iDayOfYear().should.be.equal(1)
      m = moment('2013-11-03', 'YYYY-MM-DD')//1434
      console.log(m,m.format('iYYYY/iMM/iDD'),m.iDayOfYear());
      m.iDayOfYear().should.be.equal(353)
      m = moment('2014-10-24', 'YYYY-MM-DD')//1435
      console.log(m,m.format('iYYYY/iMM/iDD'),m.iDayOfYear());
      m.iDayOfYear().should.be.equal(354)
			m = moment('2014-10-26', 'YYYY-MM-DD')//1436
      console.log(m,m.format('iYYYY/iMM/iDD'),m.iDayOfYear());
      m.iDayOfYear().should.be.equal(1)
    });

    it('should set Hijri date of year', function() {
      var m = moment('2014-10-24', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.iDayOfYear(30)
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYYYY/iM/iD').should.be.equal('1435/1/30')
      m.iDayOfYear(354)
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY/iM/iD').should.be.equal('35/12/29')
      m.iDayOfYear(355)
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY/iM/iD').should.be.equal('35/12/30')
      m.iDayOfYear(356)
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY/iM/iD').should.be.equal('36/1/1')
      m.iDayOfYear(1)
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY/iM/iD').should.be.equal('36/1/1')
      m.iDayOfYear(90)
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY/iM/iD').should.be.equal('36/4/2')
      m.iDayOfYear(354 + 354)
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.format('iYY/iM/iD').should.be.equal('37/12/30')
    });
  });

  describe('#iDaysInMonth', function() {
    it('should return Hijri days in Month', function() {
      var m = moment('1981-08-17', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.iDaysInMonth().should.be.equal(29)
      m = moment('1986-2-2', 'YYYY-MM-DD')
      console.log(m,m.format('iYYYY/iMM/iDD'));
      m.iDaysInMonth().should.be.equal(30)
    });

  });

})