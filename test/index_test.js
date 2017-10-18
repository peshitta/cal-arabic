const test = require('assert');
const sut = require('../build/cal-arabic');

describe('CAL', () => {
  describe('To Arabic', () => {
    it('General case usage, with one-to-one mapping', () => {
      const word = sut.toArabic('dqsry)-dpylypws');
      const wordExpected = 'دقسريا-دفيليفوس';
      const vocalised = sut.toArabic("d'qesariya)-d,p,yilyip'wOs");
      const vocalisedExpected = 'دقِسَرِيَا-ذفِيلِيفُوس';
      test.strictEqual(word, wordExpected, 'sut.toArabic_generic consonant');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toArabic_generic vocalised'
      );
    });
    it('Madda case', () => {
      const word = sut.toArabic('))r');
      const wordExpected = 'اار';
      const vocalised = sut.toArabic(')o)ar');
      const vocalisedExpected = 'آاَر';
      test.strictEqual(word, wordExpected, 'sut.toArabic_madda consonant');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toArabic_madda vocalised'
      );
    });
    it('Alef superscript', () => {
      const word = sut.toArabic('$mk');
      const wordExpected = 'شمك';
      const vocalised = sut.toArabic('$mok,');
      const vocalisedExpected = 'شمٰخ';
      test.strictEqual(word, wordExpected, 'sut.toArabic_madda consonant');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toArabic_madda vocalised'
      );
    });
    it('Word with (yi) => (i;) mapping', () => {
      const word = sut.toArabic('dylydwth');
      const wordExpected = 'ديليدوته';
      const vocalised = sut.toArabic("d'yilyid,wut,ehE");
      const vocalisedExpected = 'دِيلِيذُوثِهِ';
      test.strictEqual(word, wordExpected, 'sut.toArabic_yi consonant');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toArabic_yi vocalised'
      );
    });
    it('Word with short Eastern (E) => (e) mapping', () => {
      const word = sut.toArabic(')wld');
      const wordExpected = 'اولد';
      const vocalised = sut.toArabic(')awlEd');
      const vocalisedExpected = 'اَولِد';
      test.strictEqual(word, wordExpected, 'sut.toArabic_yi consonant');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toArabic_yi vocalised'
      );
    });
    it('Word with (wu) => (uO) mapping', () => {
      const word = sut.toArabic('lb(ldbbykwn');
      const wordExpected = 'لبعلدببيكون';
      const vocalised = sut.toArabic("lab,(eld'b,ob,ayk'wun");
      const vocalisedExpected = 'لَبعِلدبٰبَيكُون';
      test.strictEqual(word, wordExpected, 'sut.toArabic_wu consonant');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toArabic_wu vocalised'
      );
    });
    it('Word with (wO) => (oO) mapping', () => {
      const word = sut.toArabic(')bhwhy');
      const vocalised = sut.toArabic(')ab,ohawh_y');
      const wordExpected = 'ابهوهي';
      const vocalisedExpected = 'اَبٰهَوهي';
      test.strictEqual(word, wordExpected, 'sut.toArabic_wO consonant');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toArabic_wO vocalised'
      );
    });
    it('Word with Palestinian P', () => {
      const word = sut.toArabic(')Pbhwhy');
      const vocalised = sut.toArabic(')aPeb,ohawh_y');
      const wordExpected = 'افبهوهي';
      const vocalisedExpected = 'اَفِبٰهَوهي';
      test.strictEqual(word, wordExpected, 'sut.toArabic_wO consonant');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toArabic vocalised with P'
      );
    });
    it('Word with un-mapped chars', () => {
      const word = sut.toArabic('AZAEDT');
      const wordExpected = 'AZAِDط';
      test.strictEqual(word, wordExpected, 'sut.toArabic_wO un-mapped char');
    });
    it('Word with Hebrew Sin', () => {
      const word = sut.toArabic(')Pbhwh&');
      const wordExpected = 'افبهوهس';
      const vocalised = sut.toArabic(')aPeb,ohawh_&o');
      const vocalisedExpected = 'اَفِبٰهَوهسٰ';
      test.strictEqual(word, wordExpected, 'sut.toArabic consonant with Sin');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toArabic vocalised with Sin'
      );
    });
    it('Word with Hebrew Shin', () => {
      const word = sut.toArabic(')g$)');
      const wordExpected = 'اجشا';
      const vocalised = sut.toArabic(')og,$o)');
      const vocalisedExpected = 'آغشَا';
      test.strictEqual(word, wordExpected, 'sut.toArabic consonant with Shin');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toArabic vocalised with Shin'
      );
    });
    it('Begadkepat', () => {
      const word = sut.toArabic('begadkepat');
      const wordExpected = 'بِجَدكِفَت';
      test.strictEqual(word, wordExpected, 'sut.toArabic punctuation');
    });
    it('Punctuation', () => {
      const word = sut.toArabic(';)o)ar?');
      const wordExpected = '؛آاَر؟';
      test.strictEqual(word, wordExpected, 'sut.toArabic punctuation');
    });
    it('Invalid Rukkakha', () => {
      const word = sut.toArabic(')Pbh,swh&');
      const wordExpected = 'افبهسوهس';
      test.strictEqual(word, wordExpected, 'sut.toArabic invalid rukkakha');
    });
    it('Standalone Ou', () => {
      const word = sut.toArabic(')PbOh,suwh&');
      const wordExpected = 'افبُهسُوهس';
      test.strictEqual(word, wordExpected, 'sut.toArabic invalid rukkakha');
    });
    it('Blank word returns blank', () => {
      const word = sut.toArabic('');
      const wordExpected = '';
      test.strictEqual(word, wordExpected, 'sut.toArabic_blank');
    });
    it('Null word returns null', () => {
      const word = sut.toArabic(null);
      const wordExpected = null;
      test.strictEqual(word, wordExpected, 'sut.toArabic_null');
    });
    it('Undefined word returns undefined', () => {
      const word = sut.toArabic(undefined);
      const wordExpected = undefined;
      test.strictEqual(word, wordExpected, 'sut.toArabic_undefined');
    });
    it('0 number as word returns 0', () => {
      const word = sut.toArabic(0);
      const wordExpected = 0;
      test.strictEqual(word, wordExpected, 'sut.toArabic_zero');
    });
  });
});

describe('CAL', () => {
  describe('To Arabic', () => {
    it('Blank word returns blank', () => {
      const word = sut.toArabic('');
      const wordExpected = '';
      test.strictEqual(word, wordExpected, 'sut.toArabic_blank');
    });
    it('Null word returns null', () => {
      const word = sut.toArabic(null);
      const wordExpected = null;
      test.strictEqual(word, wordExpected, 'sut.toArabic_null');
    });
    it('Undefined word returns undefined', () => {
      const word = sut.toArabic(undefined);
      const wordExpected = undefined;
      test.strictEqual(word, wordExpected, 'sut.toArabic_undefined');
    });
    it('0 number as word returns 0', () => {
      const word = sut.toArabic(0);
      const wordExpected = 0;
      test.strictEqual(word, wordExpected, 'sut.toArabic_zero');
    });
  });
  describe('Mapped writing', () => {
    it('Consonants length', () => {
      test.strictEqual(
        sut.mapper.fromWriting.consonants.length,
        sut.mapper.toWriting.consonants.length,
        'Length differs'
      );
      test.ok(
        sut.mapper.fromWriting.consonants.length > 22,
        'Length greater than 22'
      );
    });
    it('Vowels length', () => {
      test.strictEqual(
        sut.mapper.fromWriting.vowels.length,
        sut.mapper.toWriting.vowels.length,
        'Length differs'
      );
      test.ok(
        sut.mapper.fromWriting.vowels.length > 5,
        'Length greater than 5'
      );
    });
    it('Diacritics length', () => {
      test.strictEqual(
        sut.mapper.fromWriting.diacritics.length,
        sut.mapper.toWriting.diacritics.length,
        'Length differs'
      );
      test.ok(
        (sut.mapper.fromWriting.diacritics.length = 4),
        'Length equals 4'
      );
    });
    it('Punctuation length', () => {
      test.strictEqual(
        sut.mapper.fromWriting.punctuation.length,
        sut.mapper.toWriting.punctuation.length,
        'Length differs'
      );
      test.ok(
        (sut.mapper.fromWriting.punctuation.length = 6),
        'Length equals 6'
      );
    });
  });
});
