//Originally I was going to have a file where I kept all the questions as text that Script.js would get
//That didnt work however
//I still wanted to keep them seperate and expandable so here they are

var allQuestions = [];

allQuestions[0] = {
    question: "What is HTML an acronym for?",
    ans: "Hyper Text Markup Language",
    wrong: ["Heavy Turing Markup Language", "Higher Test Machine Language", "Nothing, it just the initals of the 2 guys who created it"]
}

allQuestions[1] = {
    question: "Which of these languages has variables:",
    ans: "CSS and Javascript",
    wrong: ["HTML", "CSS", "JavaScript", "HTML and JavaScript"]
}

allQuestions[2] = {
    question: "The Section and Article HTML tags do the same thing.",
    ans: "True",
    wrong: ["False"]
}

allQuestions[3] = {
    question: "In HTML, text not written inside an element will not appear on the page.",
    ans: "False",
    wrong: ["True"]
}

allQuestions[4] = {
    question: "How is a random number from 0-9 formatted in Javascript (Rounding Excluded)?",
    ans: "Math.random() * 10",
    wrong: ["Math.random() * 9", "Math.random(0, 9)", "Math.random(9)", "Math.random(10)"]
}

allQuestions[5] = {
    question: "How do you specify a CSS var?",
    ans: 'With "--"',
    wrong: ['With "var"', 'With "let"', 'There are no variables in CSS']
}

allQuestions[6] = {
    question: "What is the most likely data type that I stored each collection of questions, answers, and wrong answers as?",
    ans: "An Object",
    wrong: ["An Array/List", "A String"]
}

allQuestions[7] = {
    question: "I want to keep randomizing a number until it reaches a certian value, what is the best loop for this?",
    ans: "A Do-While Loop",
    wrong: ["A While Loope", "A For Loop", "A ForEach Loop"]
}

allQuestions[8] = {
    question: "Where should the Title element be held?",
    ans: "Anywhere in the Head Element",
    wrong: ["Anywhere in the Body Element", "Anywhere in the HTML Element", "It does not matter where it goes"]
}

allQuestions[9] = {
    question: "You want to cancel a running function from within, what keyword do you use?",
    ans: "return;",
    wrong: ["break;", "end;", "cancel;"]
}

allQuestions[10] = {
    question: "I have a variable that can be 10 different values. I want each value to run it's own code. What is the best statement to use?",
    ans: "A Select...Case Statement",
    wrong: ["A For...Each Statement", "Muliple If...Then Statements", "Multiple If...Then...Else If... Statements"]
}

allQuestions[11] = {
    question: "I want to remove the LAST element from an array, what do I use?",
    ans: "Array.pop()",
    wrong: ["Array.Shift()", "Array.Top()", "Array.End()"]
}

allQuestions[12] = {
    question: "Which of these variable types can a JavaScript array not store",
    ans: "An array can store any variable type",
    wrong: ["Objects", "Functions", "Other Arrays"]
}

allQuestions[13] = {
    question: "A JavaScript array can store variables of different types",
    ans: "True",
    wrong: ["False"]
}

allQuestions[14] = {
    question: "ALL website use the HTML language",
    ans: "True",
    wrong: ["False"]
}