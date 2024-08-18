import React, { useState, useEffect } from "react";
import { Image } from "antd"; 

function QuestionView({ question, setAnswers,answers,output }) {
    const [ques, setQues] = useState([]);
    let ansId = 1;
    useEffect(() => {
        let lines = question.split("\\n");
        let final = lines.map((line) => {
            return line.split("$#$");
        });
        setQues(final);
    }, [question]);
    return (
        <div className="w-full py-5 flex flex-wrap">
            <div className="sm:w-1/2 w-full sm:border-e">
                {ques.map((lines, i) => {
                    return (
                        <div style={{ margin: "8px auto" }} key={i}>
                            {lines.map((piece, j) => {
                                return (
                                    <span style={{ width: "auto" }} key={j}>
                                        {piece.startsWith("#s") ? (
                                            <input
                                                className="border px-1"
                                                style={{
                                                    width: `${countWidth(piece)}px`,
                                                    margin: "0px 4px",
                                                }}
                                                type="text"
                                                name={`${ansId++}`}
                                                onChange={(e) => {
                                                    let ans = { ...answers };
                                                    ans[e.currentTarget.name] = e.target.value.trim();
                                                    setAnswers(ans);
                                                }}
                                                required
                                            />
                                        ) : piece.startsWith("@s") ? (
                                            <span
                                                style={{ paddingRight: `${countSpace(piece)}px` }}
                                            ></span>
                                        ) : (
                                            <span>{piece}</span>
                                        )}
                                    </span>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <div className="sm:w-1/2 w-full sm:ps-12">
                <p className="font-inter font-bold my-4">Sample Output</p>
                {
                    output&&(
                        <Image className="p-2 border rounded" width={280} src={output}/>
                    )
                }
            </div>
        </div>
    )
}

const countSpace = (piece) => {
    return Number(piece.split("@s")[1]) * 16;
};

const countWidth = (piece) => {
    return Number(piece.split('#s')[1]) * 16;
};

export default QuestionView;