import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  en: {
    ok: 'Ok',
    cancel: 'Cancel',
    warn_title: 'Warning about time and traffic consuming',
    warn_text: `You chose many vehicles.\n
                Generating and downloading events for
                all that vehicles could take a lot of time and traffic.\n
                Are you sure?`,
  },

  th: {
    ok: 'ตกลง',
    cancel: 'ยกเลิก',
    warn_title: 'Warning about time and traffic consuming',
    warn_text: `เลือก ยานพาหนะ\n
                รายงานจะใช้เวลาดำเนินการและดาวน์โหลดมากกว่าปกติ\n
                ต้องการดำเนินการต่อหรือไม่?`,
  },
};

export const phrasesShape = shape({
  ok: string.isRequired,
  cancel: string.isRequired,
  warn_title: string.isRequired,
  warn_text: string.isRequired,
});

export default phrases;
