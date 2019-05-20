new Vue({
    el: '#app',
    data: {
        addName: '',
        addSurname: '',
        addSection: '',
        addSalary: '',
        addCurrency: '',
        searchName: '',
        searchSalaryMax: '10000',
        searchSalaryMin: '0',
        Employees: [{
                imie: "Jan",
                nazwisko: "Kowalski",
                dzial: "IT",
                wynagrodzenieKwota: "3000",
                wynagrodzenieWaluta: "PLN"
            },
            {
                imie: "Anna",
                nazwisko: "Bąk",
                dzial: "Administracja",
                wynagrodzenieKwota: "2400.50",
                wynagrodzenieWaluta: "PLN"
            },
            {
                imie: "Paweł",
                nazwisko: "Zabłocki",
                dzial: "IT",
                wynagrodzenieKwota: "3300",
                wynagrodzenieWaluta: "PLN"
            },
            {
                imie: "Tomasz",
                nazwisko: "Osiecki",
                dzial: "Administracja",
                wynagrodzenieKwota: "2100",
                wynagrodzenieWaluta: "PLN"
            },
            {
                imie: "Iwona",
                nazwisko: "Leihs-Gutowska",
                dzial: "Handlowiec",
                wynagrodzenieKwota: "3100",
                wynagrodzenieWaluta: "PLN"
            },
        ],
        searchCheck: ["IT"],
    },
    methods: {
        addEmployee: function () {
            this.Employees.push({
                imie: this.addName,
                nazwisko: this.addSurname,
                dzial: this.addSection,
                wynagrodzenieKwota: this.addSalary,
                wynagrodzenieWaluta: this.addCurrency,
            });
        }
    },
    computed: {
        Sections: function () {
            let section_array = [];
            for (let i = 0; i < this.Employees.length; i++) {
                if (section_array.indexOf(this.Employees[i].dzial) === -1) {
                    section_array.push(this.Employees[i].dzial)
                }
            }
            return section_array;
        },

        SumSalary: function () {
            let salarySum = 0;
            let sum_array = [];
            for (let i = 0; i < this.Sections.length; i++) {
                for (let j = 0; j < this.Employees.length; j++) {
                    if (this.Sections[i] == this.Employees[j].dzial) {
                        salarySum = parseFloat(salarySum) + parseFloat(this.Employees[j].wynagrodzenieKwota);
                    }
                }
                sum_array.push({
                    dzial: this.Sections[i],
                    wynagrodzenieSuma: salarySum,
                });
                salarySum = 0;
            }
            return sum_array;
        },

        SumAll: function () {
            let allSum = 0;
            for (let j = 0; j < this.Employees.length; j++) {
                allSum = parseFloat(allSum) + parseFloat(this.Employees[j].wynagrodzenieKwota);
            }
            return allSum;
        },

        employeesFilteredName: function () {
            let searchText = this.searchName.toLowerCase();
            return this.Employees.filter(function (item) {
                const fullName = item.imie.toLowerCase() + " " + item.nazwisko.toLowerCase()
                if (item.imie.toLowerCase().indexOf(searchText) >= 0 || item.nazwisko.toLowerCase().indexOf(searchText) >= 0 || fullName.indexOf(searchText) >= 0) {
                    return item;
                }

            })
        },

        employeesFilteredSection: function () {
            let check_section_array = [];
            for (let i = 0; i < this.searchCheck.length; i++) {
                for (let j = 0; j < this.employeesFilteredName.length; j++) {
                    if (this.searchCheck[i] == this.employeesFilteredName[j].dzial) {
                        check_section_array.push({
                            imie: this.employeesFilteredName[j].imie,
                            nazwisko: this.employeesFilteredName[j].nazwisko,
                            dzial: this.employeesFilteredName[j].dzial,
                            wynagrodzenieKwota: this.employeesFilteredName[j].wynagrodzenieKwota,
                            wynagrodzenieWaluta: this.employeesFilteredName[j].wynagrodzenieWaluta
                        })
                    }
                }
            }
            return check_section_array;
        },

        employeesFilteredSalary: function () {
            let salary_array = [];
            let salaryMin = parseFloat(this.searchSalaryMin);
            let salaryMax = parseFloat(this.searchSalaryMax);
            for (let i = 0; i < this.employeesFilteredSection.length; i++) {
                if (salaryMin < parseFloat(this.employeesFilteredSection[i].wynagrodzenieKwota) && salaryMax > parseFloat(this.employeesFilteredSection[i].wynagrodzenieKwota)) {
                    salary_array.push({
                        imie: this.employeesFilteredSection[i].imie,
                        nazwisko: this.employeesFilteredSection[i].nazwisko,
                        dzial: this.employeesFilteredSection[i].dzial,
                        wynagrodzenieKwota: this.employeesFilteredSection[i].wynagrodzenieKwota,
                        wynagrodzenieWaluta: this.employeesFilteredSection[i].wynagrodzenieWaluta
                    })
                }
            }
            return salary_array;
        },

    }
})