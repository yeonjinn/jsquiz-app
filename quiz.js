
const number=document.querySelector(".number");            //문제번호
const Question=document.querySelector(".ask");             //문제
const Selects=document.querySelector(".quiz_selects");     //객관식 선택
const Next=document.querySelector("#Next");                //다음문제
const check=document.querySelector("#result");
const Result=document.querySelector(".quiz_result");       //퀴즈 결과
const scoreElement=document.querySelector(".score");
const incorrectQuestionsElement=document.querySelector(".incorrect-questions")
const failquiz=document.querySelector('#re-quiz');

let answerCount=0;
let index=0;
let data=[];
let Fail=[];
let score=0;

function Run(){
    check.style.display="none"
    failquiz.style.display="none"

    

    function Quiz(index){

        number.innerText=(index+1)+'.';             //문제 번호 출력
        const json_Quiz=data[index]; 

        Question.innerText=json_Quiz["question"];   //문제 출력
        
        //객관식 선택
        const choiceTag = `
            <p>
                <label for="select1">
                    <input type="radio" id="select1" name="select" value="0" >
                    <span class="choice">${json_Quiz.answers[0]}</span>
                </label>
            </p>
            <p>
                <label for="select2">
                    <input type="radio" id="select2" name="select" value="1" >
                    <span class="choice">${json_Quiz.answers[1]}</span>
                </label>
            </p>
            <p>
                <label for="select3">
                    <input type="radio" id="select3" name="select" value="2" >
                    <span class="choice">${json_Quiz.answers[2]}</span>
                </label>    
            </p>
            <p>
                <label for="select4">
                    <input type="radio" id="select4" name="select" value="3" >
                    <span class="choice">${json_Quiz.answers[3]}</span>
                </label>
            </p>
        `;
        Selects.innerHTML=choiceTag;


    }
    Quiz(index);

    //정답 확인
    function checkAnswer() {
        const selectedAnswer = document.querySelector('input[name="select"]:checked');
        
        if(!selectedAnswer){
            return;
        }

        const selectedAnswerIndex=parseInt(selectedAnswer.value);
        const currentQuiestion=data[index];

        if(selectedAnswerIndex===currentQuiestion.correct){
            score++;
        }else{
            Fail.push(index);
        }

        index++;

        if(index<data.length){
            Quiz(index);
        }else{
            Next.style.display="none"
            check.style.display="block"            
        }
        return selectedAnswer;
    }

    function showResult(){
        number.innerText='';
        Question.innerText='';
        Selects.innerText='';

        const totalQuestions=data.length;
        const percentage=(score/totalQuestions)*100;

        scoreElement.innerText=percentage+' 점!';

        
    }

    Next.addEventListener('click', checkAnswer);

    check.addEventListener('click',showResult);


}



fetch("./exam.json")
.then(response =>response.json())
.then(result => {
    data=result;
    //console.log(data);
    Run();
});