// Fills every element with data-age-from="YYYY-MM-DD" with the age (in years) since that date.
function computeAge(birthDate, today) {
    const [year, month, day] = birthDate.split('-').map(Number);

    let age = today.getFullYear() - year;

    // getMonth() is 0-based, the date string is 1-based.
    const currentMonth = today.getMonth() + 1;
    const birthdayPassed =
        currentMonth > month || (currentMonth === month && today.getDate() >= day);
    if (!birthdayPassed) age--;

    return age;
}

const today = new Date();
document.querySelectorAll('[data-age-from]').forEach((el) => {
    el.textContent = computeAge(el.dataset.ageFrom, today);
});
