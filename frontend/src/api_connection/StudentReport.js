import axios from "axios";

export const usersInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const headersUserAccessToken = () => ({
    Authorization: `${localStorage.getItem('token-studebts')}`,
    'Content-Type': 'application/json',
});

export const getInterest = async () => {
  const data = await usersInstance
    .get(`/students/interest `, {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      return  error.response?.data ?? error;
    });
  return data;
};

export const getReport1 = async () => {
  const data = await usersInstance
    .get(`/students/report1`, {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      return  error.response?.data ?? error;
    });
  return data;
};

export const getJobtask = async () => {
  const data = await usersInstance
    .get(`/students/job-task`, {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      return  error.response?.data ?? error;
    });
  return data;
};

export const getJobknowlage = async () => {
  const data = await usersInstance
    .get(`/students/job-knowlage`, {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      return  error.response?.data ?? error;
    });
  return data;
};

export const getJobactivities = async () => {
  const data = await usersInstance
    .get(`/students/job-activities`, {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      return  error.response?.data ?? error;
    });
  return data;
};

export const getJobskill = async () => {
  const data = await usersInstance
    .get(`/students/job-skill`, {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      return  error.response?.data ?? error;
    });
  return data;
};

export const getJobabilitie = async () => {
  const data = await usersInstance
    .get(`/students/job-abilitie`, {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      return  error.response?.data ?? error;
    });
  return data;
};

export const getReport = async () => {
  const data = await usersInstance
    .get(`/students/report`, {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      return  error.response?.data ?? error;
    });
  return data;
};

export const getRaisec = async () => {
  const data = await usersInstance
    .get(`/quiz/get-raisec`, {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      return  error.response?.data ?? error;
    });
  return data;
};

export const getReport4 = async () => {
  const data = await usersInstance
    .get(`/students/report4`, {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      return  error.response?.data ?? error;
    });
  return data;
};

export const getStr = async () => {
  const data = await usersInstance
    .get(`/quiz/get-str`, {
      headers: {
        ...headersUserAccessToken(),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      return  error.response?.data ?? error;
    });
  return data;
};

export const sort_jobs = async () => {
  let res = await getReport1()
  let interest = await getInterest()
  let jobs_student = interest.job

  let jobs_task = await getJobtask()
  let jobs_knowledge = await getJobknowlage()

  let jobs_activities = await getJobactivities()
  let jobs_skill = await getJobskill()
  let jobs_abilitie = await getJobabilitie()
  
  

  for(let index of jobs_student){
    index.jobs_task = []
    for(let item of jobs_task.data){
      if(index.o_net_soc == item.onet_code){
        index.jobs_task.push(item)
      }
    }

    index.jobs_knowledge = []
    for(let item of jobs_knowledge.data){
      if(index.jobs_eng == item.title){
        index.jobs_knowledge.push(item)
      }
    }

    index.jobs_activities = []
    for(let item of jobs_activities.data){
      if(index.jobs_eng == item.title){
        index.jobs_activities.push(item)
      }
    }

    index.jobs_skill = []
    for(let item of jobs_skill.data){
      if(index.o_net_soc == item.onet_code){
        index.jobs_skill.push(item)
      }
    }

    index.jobs_abilitie = []
    for(let item of jobs_abilitie.data){
      if(index.o_net_soc == item.onet_code){
        index.jobs_abilitie.push(item)
      }
    }
    
    index.artistic = res.point_interres.artistic ;
    index.conventional = res.point_interres.conventional ;
    index.enterprising = res.point_interres.enterprising ;
    index.investigative = res.point_interres.investigative ;
    index.realistic = res.point_interres.realistic ;
    index.social = res.point_interres.social ;
    index.point_work_activities = res.point_work_activities.total_score

    index.work_values_achievement = res.point_work_values.achievement ;
    index.work_values_independence = res.point_work_values.independence ;
    index.work_values_recognition = res.point_work_values.recognition ;
    index.work_values_relationships = res.point_work_values.relationships ;
    index.work_values_support = res.point_work_values.support ;
    index.work_values_working_conditions = res.point_work_values.working_conditions ;

    index.interest = []
    for(let item of interest.data){
      if(item.onet_code == index.o_net_soc){
        index.interest.push(item)
      }
    }
    index.work_values = []
    for(let work_values of interest.work_values){
      if(work_values.onet_code == index.o_net_soc){
        index.work_values.push(work_values)
      }
    }
    index.work_activities = []
    for(let work_activities of interest.work_activities){
      if(work_activities.onet_code == index.o_net_soc){
        index.work_activities.push(work_activities)
      }
    }
  }

  for(let item of jobs_student){
      item.total_work_activities = 0
      item.total_score_work_activities = 0
      item.total_last_score_work_activities = 0
      if(item.work_activities.length > 0 ){
        for(let detail of item.work_activities){
          if(Number(detail.important_score) < 0 || Number(detail.important_score) === 'NaN' ){
            detail.important_score = 0 
          }
          item.total_work_activities += Number(item.point_work_activities) * Number(detail.important_score)
          item.total_score_work_activities += Number(detail.important_score) * 5
        }
        item.total_last_score_work_activities = ((item.total_work_activities /  item.total_score_work_activities) * 0.25).toFixed(2)
        
      }
      item.total_work_values = 0
      item.total_score_work_values = 0
      item.total_last_score_work_values = 0

      if(item.work_values.length > 0 ){
        for(let detail of item.work_values){
          if(Number(detail.important_score) === 'NaN'){
            detail.important_score = 0 
          }
          if(detail.element_name == "Achievement"){
            item.total_work_values += Number(item.work_values_achievement) * Number(detail.important_score)
            item.total_score_work_values += Number(detail.important_score) * 5
          }else if(detail.element_name == "Working Conditions"){
            item.total_work_values += Number(item.work_values_working_conditions) * Number(detail.important_score)
            item.total_score_work_values += Number(detail.important_score) * 5
          }else if(detail.element_name == "Recognition"){
            item.total_work_values += Number(item.work_values_recognition) * Number(detail.important_score)
            item.total_score_work_values += Number(detail.important_score) * 5
          }else if(detail.element_name == "Relationships"){
            item.total_work_values += Number(item.work_values_relationships) * Number(detail.important_score)
            item.total_score_work_values += Number(detail.important_score) * 5
          }else if(detail.element_name == "Support"){
            item.total_work_values += Number(item.work_values_support) * Number(detail.important_score)
            item.total_score_work_values += Number(detail.important_score) * 5
          }else if(detail.element_name == "Independence"){
            item.total_work_values += Number(item.work_values_independence) * Number(detail.important_score)
            item.total_score_work_values = Number(detail.important_score) * 5
          }
        }
        item.total_last_score_work_values = (((item.total_work_values / item.total_score_work_values) * 0.25)*100).toFixed(2)
      }

      item.totalScore = 0
      item.totalScoreCEO = 0
      if(item.interest.length == 0){
        item.realistic_score = 0
        item.realistic_important_score = 0
        item.ceo_realistic_score = 0
        item.investigative_score = 0
        item.investigative_important_score = 0
        item.ceo_investigative_score = 0
        item.artistic_score = 0
        item.artistic_important_score = 0
        item.ceo_artistic_score = 0
        item.social_score = 0
        item.social_important_score = 0
        item.ceo_social_score = 0
        item.enterprising_score = 0
        item.enterprising_important_score = 0
        item.ceo_enterprising_score = 0
        item.conventional_score = 0
        item.conventional_important_score = 0
        item.ceo_conventional_score = 0

        item.totalScore += 0
        item.totalScoreCEO += 0

        item.total_percen = 0
        item.total_percen = 0

      }else{
        for(let detail of item.interest ){
          if(detail.element_name == "Realistic"){
            item.realistic_score = Number(item.realistic) * Number(detail.important_score)
            item.realistic_important_score = Number(detail.important_score)
            item.ceo_realistic_score = item.realistic_important_score * 45
            item.totalScore += item.realistic_score
            item.totalScoreCEO += item.ceo_realistic_score
          }else if (detail.element_name == "Investigative"){
            item.investigative_score = Number(item.investigative) * Number(detail.important_score)
            item.investigative_important_score = Number(detail.important_score)
            item.ceo_investigative_score = item.investigative_important_score * 45

            item.totalScore += item.investigative_score
            item.totalScoreCEO += item.ceo_investigative_score

          }else if (detail.element_name == "Artistic"){
            item.artistic_score = Number(item.artistic) * Number(detail.important_score)
            item.artistic_important_score = Number(detail.important_score)
            item.ceo_artistic_score = item.artistic_important_score * 45

            item.totalScore += item.artistic_score
            item.totalScoreCEO += item.ceo_artistic_score

          }else if (detail.element_name == "Social"){
            item.social_score = Number(item.social) * Number(detail.important_score)
            item.social_important_score = Number(detail.important_score)
            item.ceo_social_score = item.social_important_score * 45

            item.totalScore += item.social_score
            item.totalScoreCEO += item.ceo_social_score
              
          }else if (detail.element_name == "Enterprising"){
            item.enterprising_score = Number(item.enterprising) * Number(detail.important_score)
            item.enterprising_important_score = Number(detail.important_score)
            item.ceo_enterprising_score = item.enterprising_important_score * 45

            item.totalScore += item.enterprising_score
            item.totalScoreCEO += item.ceo_enterprising_score
              
          }else if (detail.element_name == "Conventional"){
            item.conventional_score = Number(item.conventional) * Number(detail.important_score)
            item.conventional_important_score = Number(detail.important_score)
            item.ceo_conventional_score = item.conventional_important_score * 45

            item.totalScore += item.conventional_score
            item.totalScoreCEO += item.ceo_conventional_score

          }
        }
        if(item.total_last_score_work_activities === 'NaN'){
          item.total_last_score_work_activities = 0
        }
        if(item.total_last_score_work_values === 'NaN'){
          item.total_last_score_work_values = 0
        }
        item.total_percen = ((((item.totalScore/item.totalScoreCEO) /2)*100)+Number(item.total_last_score_work_values)+Number(item.total_last_score_work_activities)).toFixed(2)
    }
  }

  jobs_student.sort(function(a, b ) {
      return  b.total_percen - a.total_percen;
  });

  return jobs_student[0]

};

export const sort_jobs2 = async () => {
  let res = await getReport1()
  let interest = await getInterest()
  let jobs_student =  interest.job_bright_outlook

  let jobs_task = await getJobtask()
  let jobs_knowledge = await getJobknowlage()

  let jobs_activities = await getJobactivities()
  let jobs_skill = await getJobskill()
  let jobs_abilitie = await getJobabilitie()
  
  

  for(let index of jobs_student){
    index.jobs_task = []
    for(let item of jobs_task.data){
      if(index.o_net_soc == item.onet_code){
        index.jobs_task.push(item)
      }
    }

    index.jobs_knowledge = []
    for(let item of jobs_knowledge.data){
      if(index.jobs_eng == item.title){
        index.jobs_knowledge.push(item)
      }
    }

    index.jobs_activities = []
    for(let item of jobs_activities.data){
      if(index.jobs_eng == item.title){
        index.jobs_activities.push(item)
      }
    }

    index.jobs_skill = []
    for(let item of jobs_skill.data){
      if(index.o_net_soc == item.onet_code){
        index.jobs_skill.push(item)
      }
    }

    index.jobs_abilitie = []
    for(let item of jobs_abilitie.data){
      if(index.o_net_soc == item.onet_code){
        index.jobs_abilitie.push(item)
      }
    }

    index.artistic = res.point_interres.artistic ;
    index.conventional = res.point_interres.conventional ;
    index.enterprising = res.point_interres.enterprising ;
    index.investigative = res.point_interres.investigative ;
    index.realistic = res.point_interres.realistic ;
    index.social = res.point_interres.social ;
    index.point_work_activities = res.point_work_activities.total_score

    index.work_values_achievement = res.point_work_values.achievement ;
    index.work_values_independence = res.point_work_values.independence ;
    index.work_values_recognition = res.point_work_values.recognition ;
    index.work_values_relationships = res.point_work_values.relationships ;
    index.work_values_support = res.point_work_values.support ;
    index.work_values_working_conditions = res.point_work_values.working_conditions ;

    index.interest = []
    for(let item of interest.data){
      if(item.onet_code == index.o_net_soc){
        index.interest.push(item)
      }
    }
    index.work_values = []
    for(let work_values of interest.work_values){
      if(work_values.onet_code == index.o_net_soc){
        index.work_values.push(work_values)
      }
    }
    index.work_activities = []
    for(let work_activities of interest.work_activities){
      if(work_activities.onet_code == index.o_net_soc){
        index.work_activities.push(work_activities)
      }
    }
  }

  for(let item of jobs_student){
      item.total_work_activities = 0
      item.total_score_work_activities = 0
      item.total_last_score_work_activities = 0
      if(item.work_activities.length > 0 ){
        for(let detail of item.work_activities){
          if(Number(detail.important_score) < 0 || Number(detail.important_score) === 'NaN' ){
            detail.important_score = 0 
          }
          item.total_work_activities += Number(item.point_work_activities) * Number(detail.important_score)
          item.total_score_work_activities += Number(detail.important_score) * 5
        }
        item.total_last_score_work_activities = ((item.total_work_activities /  item.total_score_work_activities) * 0.25).toFixed(2)
        
      }
      item.total_work_values = 0
      item.total_score_work_values = 0
      item.total_last_score_work_values = 0

      if(item.work_values.length > 0 ){
        for(let detail of item.work_values){
          if(Number(detail.important_score) === 'NaN'){
            detail.important_score = 0 
          }
          if(detail.element_name == "Achievement"){
            item.total_work_values += Number(item.work_values_achievement) * Number(detail.important_score)
            item.total_score_work_values += Number(detail.important_score) * 45
          }else if(detail.element_name == "Working Conditions"){
            item.total_work_values += Number(item.work_values_working_conditions) * Number(detail.important_score)
            item.total_score_work_values += Number(detail.important_score) * 45
          }else if(detail.element_name == "Recognition"){
            item.total_work_values += Number(item.work_values_recognition) * Number(detail.important_score)
            item.total_score_work_values += Number(detail.important_score) * 45
          }else if(detail.element_name == "Relationships"){
            item.total_work_values += Number(item.work_values_relationships) * Number(detail.important_score)
            item.total_score_work_values += Number(detail.important_score) * 45
          }else if(detail.element_name == "Support"){
            item.total_work_values += Number(item.work_values_support) * Number(detail.important_score)
            item.total_score_work_values += Number(detail.important_score) * 45
          }else if(detail.element_name == "Independence"){
            item.total_work_values += Number(item.work_values_independence) * Number(detail.important_score)
            item.total_score_work_values = Number(detail.important_score) * 45
          }
        }
        item.total_last_score_work_values = (((item.total_work_values / item.total_score_work_values) * 0.25)*100).toFixed(2)
      }

      item.totalScore = 0
      item.totalScoreCEO = 0
      if(item.interest.length == 0){
        item.realistic_score = 0
        item.realistic_important_score = 0
        item.ceo_realistic_score = 0
        item.investigative_score = 0
        item.investigative_important_score = 0
        item.ceo_investigative_score = 0
        item.artistic_score = 0
        item.artistic_important_score = 0
        item.ceo_artistic_score = 0
        item.social_score = 0
        item.social_important_score = 0
        item.ceo_social_score = 0
        item.enterprising_score = 0
        item.enterprising_important_score = 0
        item.ceo_enterprising_score = 0
        item.conventional_score = 0
        item.conventional_important_score = 0
        item.ceo_conventional_score = 0

        item.totalScore += 0
        item.totalScoreCEO += 0

        item.total_percen = 0
        item.total_percen = 0

      }else{
        for(let detail of item.interest ){
          if(detail.element_name == "Realistic"){
            item.realistic_score = Number(item.realistic) * Number(detail.important_score)
            item.realistic_important_score = Number(detail.important_score)
            item.ceo_realistic_score = item.realistic_important_score * 45
            item.totalScore += item.realistic_score
            item.totalScoreCEO += item.ceo_realistic_score
          }else if (detail.element_name == "Investigative"){
            item.investigative_score = Number(item.investigative) * Number(detail.important_score)
            item.investigative_important_score = Number(detail.important_score)
            item.ceo_investigative_score = item.investigative_important_score * 45

            item.totalScore += item.investigative_score
            item.totalScoreCEO += item.ceo_investigative_score

          }else if (detail.element_name == "Artistic"){
            item.artistic_score = Number(item.artistic) * Number(detail.important_score)
            item.artistic_important_score = Number(detail.important_score)
            item.ceo_artistic_score = item.artistic_important_score * 45

            item.totalScore += item.artistic_score
            item.totalScoreCEO += item.ceo_artistic_score

          }else if (detail.element_name == "Social"){
            item.social_score = Number(item.social) * Number(detail.important_score)
            item.social_important_score = Number(detail.important_score)
            item.ceo_social_score = item.social_important_score * 45

            item.totalScore += item.social_score
            item.totalScoreCEO += item.ceo_social_score
              
          }else if (detail.element_name == "Enterprising"){
            item.enterprising_score = Number(item.enterprising) * Number(detail.important_score)
            item.enterprising_important_score = Number(detail.important_score)
            item.ceo_enterprising_score = item.enterprising_important_score * 45

            item.totalScore += item.enterprising_score
            item.totalScoreCEO += item.ceo_enterprising_score
              
          }else if (detail.element_name == "Conventional"){
            item.conventional_score = Number(item.conventional) * Number(detail.important_score)
            item.conventional_important_score = Number(detail.important_score)
            item.ceo_conventional_score = item.conventional_important_score * 45

            item.totalScore += item.conventional_score
            item.totalScoreCEO += item.ceo_conventional_score

          }
        }
        if(item.total_last_score_work_activities === 'NaN'){
          item.total_last_score_work_activities = 0
        }
        if(item.total_last_score_work_values === 'NaN'){
          item.total_last_score_work_values = 0
        }
        item.total_percen = ((((item.totalScore/item.totalScoreCEO) /2)*100)+Number(item.total_last_score_work_values)+Number(item.total_last_score_work_activities)).toFixed(2)
    }
  }

  jobs_student.sort(function(a, b ) {
      return  b.total_percen - a.total_percen;
  });

  return jobs_student

};

export const sort_jobs3 = async () => {
  let res = await getReport1()
  let interest = await getInterest()
  let jobs_student =  interest.job_bright_outlook

  let jobs_task = await getJobtask()
  let jobs_knowledge = await getJobknowlage()

  let jobs_activities = await getJobactivities()
  let jobs_skill = await getJobskill()
  let jobs_abilitie = await getJobabilitie()
  
  

  for(let index of jobs_student){
    index.jobs_task = []
    for(let item of jobs_task.data){
      if(index.o_net_soc == item.onet_code){
        index.jobs_task.push(item)
      }
    }

    index.jobs_knowledge = []
    for(let item of jobs_knowledge.data){
      if(index.jobs_eng == item.title){
        index.jobs_knowledge.push(item)
      }
    }

    index.jobs_activities = []
    for(let item of jobs_activities.data){
      if(index.jobs_eng == item.title){
        index.jobs_activities.push(item)
      }
    }

    index.jobs_skill = []
    for(let item of jobs_skill.data){
      if(index.o_net_soc == item.onet_code){
        index.jobs_skill.push(item)
      }
    }

    index.jobs_abilitie = []
    for(let item of jobs_abilitie.data){
      if(index.o_net_soc == item.onet_code){
        index.jobs_abilitie.push(item)
      }
    }

    index.artistic = res.point_interres.a_i_am ;
    index.conventional = res.point_interres.c_i_am ;
    index.enterprising = res.point_interres.e_i_am ;
    index.investigative = res.point_interres.i_i_am ;
    index.realistic = res.point_interres.r_i_am ;
    index.social = res.point_interres.s_i_am ;
    index.point_work_activities = res.point_work_activities.total_score

    index.work_values_achievement = res.point_work_values.achievement ;
    index.work_values_independence = res.point_work_values.independence ;
    index.work_values_recognition = res.point_work_values.recognition ;
    index.work_values_relationships = res.point_work_values.relationships ;
    index.work_values_support = res.point_work_values.support ;
    index.work_values_working_conditions = res.point_work_values.working_conditions ;

    index.interest = []
    for(let item of interest.data){
      if(item.onet_code == index.o_net_soc){
        index.interest.push(item)
      }
    }
    index.work_values = []
    for(let work_values of interest.work_values){
      if(work_values.onet_code == index.o_net_soc){
        index.work_values.push(work_values)
      }
    }
    index.work_activities = []
    for(let work_activities of interest.work_activities){
      if(work_activities.onet_code == index.o_net_soc){
        index.work_activities.push(work_activities)
      }
    }
  }

  for(let item of jobs_student){

      item.total_work_values = 0
      item.total_score_work_values = 0
      item.total_last_score_work_values = 0

      if(item.work_values.length > 0 ){
        for(let detail of item.work_values){
          if(Number(detail.important_score) === 'NaN'){
            detail.important_score = 0 
          }
          if(detail.element_name == "Achievement"){
            item.total_work_values += Number(item.work_values_achievement) * Number(detail.important_score)
            item.total_score_work_values += Number(detail.important_score) * 5
          }else if(detail.element_name == "Working Conditions"){
            item.total_work_values += Number(item.work_values_working_conditions) * Number(detail.important_score)
            item.total_score_work_values += Number(detail.important_score) * 5
          }else if(detail.element_name == "Recognition"){
            item.total_work_values += Number(item.work_values_recognition) * Number(detail.important_score)
            item.total_score_work_values += Number(detail.important_score) * 5
          }else if(detail.element_name == "Relationships"){
            item.total_work_values += Number(item.work_values_relationships) * Number(detail.important_score)
            item.total_score_work_values += Number(detail.important_score) * 5
          }else if(detail.element_name == "Support"){
            item.total_work_values += Number(item.work_values_support) * Number(detail.important_score)
            item.total_score_work_values += Number(detail.important_score) * 5
          }else if(detail.element_name == "Independence"){
            item.total_work_values += Number(item.work_values_independence) * Number(detail.important_score)
            item.total_score_work_values = Number(detail.important_score) * 5
          }
        }
        item.total_last_score_work_values = (((item.total_work_values / item.total_score_work_values) * 0.5)*100).toFixed(2)
      }

      item.totalScore = 0
      item.totalScoreCEO = 0
      if(item.interest.length == 0){
        item.realistic_score = 0
        item.realistic_important_score = 0
        item.ceo_realistic_score = 0
        item.investigative_score = 0
        item.investigative_important_score = 0
        item.ceo_investigative_score = 0
        item.artistic_score = 0
        item.artistic_important_score = 0
        item.ceo_artistic_score = 0
        item.social_score = 0
        item.social_important_score = 0
        item.ceo_social_score = 0
        item.enterprising_score = 0
        item.enterprising_important_score = 0
        item.ceo_enterprising_score = 0
        item.conventional_score = 0
        item.conventional_important_score = 0
        item.ceo_conventional_score = 0

        item.totalScore += 0
        item.totalScoreCEO += 0

        item.total_percen = 0
        item.total_percen = 0

      }else{
        for(let detail of item.interest ){
          if(detail.element_name == "Realistic"){
            item.realistic_score = Number(item.realistic) * Number(detail.important_score)
            item.realistic_important_score = Number(detail.important_score)
            item.ceo_realistic_score = item.realistic_important_score * 15
            item.totalScore += item.realistic_score
            item.totalScoreCEO += item.ceo_realistic_score
          }else if (detail.element_name == "Investigative"){
            item.investigative_score = Number(item.investigative) * Number(detail.important_score)
            item.investigative_important_score = Number(detail.important_score)
            item.ceo_investigative_score = item.investigative_important_score * 15

            item.totalScore += item.investigative_score
            item.totalScoreCEO += item.ceo_investigative_score

          }else if (detail.element_name == "Artistic"){
            item.artistic_score = Number(item.artistic) * Number(detail.important_score)
            item.artistic_important_score = Number(detail.important_score)
            item.ceo_artistic_score = item.artistic_important_score * 15

            item.totalScore += item.artistic_score
            item.totalScoreCEO += item.ceo_artistic_score

          }else if (detail.element_name == "Social"){
            item.social_score = Number(item.social) * Number(detail.important_score)
            item.social_important_score = Number(detail.important_score)
            item.ceo_social_score = item.social_important_score * 15

            item.totalScore += item.social_score
            item.totalScoreCEO += item.ceo_social_score
              
          }else if (detail.element_name == "Enterprising"){
            item.enterprising_score = Number(item.enterprising) * Number(detail.important_score)
            item.enterprising_important_score = Number(detail.important_score)
            item.ceo_enterprising_score = item.enterprising_important_score * 15

            item.totalScore += item.enterprising_score
            item.totalScoreCEO += item.ceo_enterprising_score
              
          }else if (detail.element_name == "Conventional"){
            item.conventional_score = Number(item.conventional) * Number(detail.important_score)
            item.conventional_important_score = Number(detail.important_score)
            item.ceo_conventional_score = item.conventional_important_score * 15

            item.totalScore += item.conventional_score
            item.totalScoreCEO += item.ceo_conventional_score

          }
        }
        if(item.total_last_score_work_activities === 'NaN'){
          item.total_last_score_work_activities = 0
        }
        if(item.total_last_score_work_values === 'NaN'){
          item.total_last_score_work_values = 0
        }
        item.total_percen = ((((item.totalScore/item.totalScoreCEO) /2)*100)+Number(item.total_last_score_work_values)).toFixed(2)
    }
  }

  jobs_student.sort(function(a, b ) {
      return  b.total_percen - a.total_percen;
  });

  return jobs_student
};

export const sort_jobs4 = async () => {
  let res = await getReport1()
  let interest = await getInterest()
  let jobs_student =  interest.job_bright_outlook

  let jobs_task = await getJobtask()
  let jobs_knowledge = await getJobknowlage()

  let jobs_activities = await getJobactivities()
  let jobs_skill = await getJobskill()
  let jobs_abilitie = await getJobabilitie()
  
  

  for(let index of jobs_student){
    index.jobs_task = []
    for(let item of jobs_task.data){
      if(index.o_net_soc == item.onet_code){
        index.jobs_task.push(item)
      }
    }

    index.jobs_knowledge = []
    for(let item of jobs_knowledge.data){
      if(index.jobs_eng == item.title){
        index.jobs_knowledge.push(item)
      }
    }

    index.jobs_activities = []
    for(let item of jobs_activities.data){
      if(index.jobs_eng == item.title){
        index.jobs_activities.push(item)
      }
    }

    index.jobs_skill = []
    for(let item of jobs_skill.data){
      if(index.o_net_soc == item.onet_code){
        index.jobs_skill.push(item)
      }
    }

    index.jobs_abilitie = []
    for(let item of jobs_abilitie.data){
      if(index.o_net_soc == item.onet_code){
        index.jobs_abilitie.push(item)
      }
    }

    index.artistic = res.point_interres.a_i_like ;
    index.conventional = res.point_interres.c_i_like ;
    index.enterprising = res.point_interres.e_i_like ;
    index.investigative = res.point_interres.i_i_like ;
    index.realistic = res.point_interres.r_i_like ;
    index.social = res.point_interres.s_i_like ;
    index.point_work_activities = res.point_work_activities.total_score

    index.work_values_achievement = res.point_work_values.achievement ;
    index.work_values_independence = res.point_work_values.independence ;
    index.work_values_recognition = res.point_work_values.recognition ;
    index.work_values_relationships = res.point_work_values.relationships ;
    index.work_values_support = res.point_work_values.support ;
    index.work_values_working_conditions = res.point_work_values.working_conditions ;

    index.interest = []
    for(let item of interest.data){
      if(item.onet_code == index.o_net_soc){
        index.interest.push(item)
      }
    }
    index.work_values = []
    for(let work_values of interest.work_values){
      if(work_values.onet_code == index.o_net_soc){
        index.work_values.push(work_values)
      }
    }
    index.work_activities = []
    for(let work_activities of interest.work_activities){
      if(work_activities.onet_code == index.o_net_soc){
        index.work_activities.push(work_activities)
      }
    }
  }

  for(let item of jobs_student){
      item.total_work_activities = 0
      item.total_score_work_activities = 0
      item.total_last_score_work_activities = 0
      if(item.work_activities.length > 0 ){
        for(let detail of item.work_activities){
          if(Number(detail.important_score) < 0 || Number(detail.important_score) === 'NaN' ){
            detail.important_score = 0 
          }
          item.total_work_activities += Number(item.point_work_activities) * Number(detail.important_score)
          item.total_score_work_activities += Number(detail.important_score) * 5
        }
        item.total_last_score_work_activities = ((item.total_work_activities /  item.total_score_work_activities) * 0.5).toFixed(2)
        
      }

      item.totalScore = 0
      item.totalScoreCEO = 0
      if(item.interest.length == 0){
        item.realistic_score = 0
        item.realistic_important_score = 0
        item.ceo_realistic_score = 0
        item.investigative_score = 0
        item.investigative_important_score = 0
        item.ceo_investigative_score = 0
        item.artistic_score = 0
        item.artistic_important_score = 0
        item.ceo_artistic_score = 0
        item.social_score = 0
        item.social_important_score = 0
        item.ceo_social_score = 0
        item.enterprising_score = 0
        item.enterprising_important_score = 0
        item.ceo_enterprising_score = 0
        item.conventional_score = 0
        item.conventional_important_score = 0
        item.ceo_conventional_score = 0

        item.totalScore += 0
        item.totalScoreCEO += 0

        item.total_percen = 0
        item.total_percen = 0

      }else{
        for(let detail of item.interest ){
          if(detail.element_name == "Realistic"){
            item.realistic_score = Number(item.realistic) * Number(detail.important_score)
            item.realistic_important_score = Number(detail.important_score)
            item.ceo_realistic_score = item.realistic_important_score * 15
            item.totalScore += item.realistic_score
            item.totalScoreCEO += item.ceo_realistic_score
          }else if (detail.element_name == "Investigative"){
            item.investigative_score = Number(item.investigative) * Number(detail.important_score)
            item.investigative_important_score = Number(detail.important_score)
            item.ceo_investigative_score = item.investigative_important_score * 15

            item.totalScore += item.investigative_score
            item.totalScoreCEO += item.ceo_investigative_score

          }else if (detail.element_name == "Artistic"){
            item.artistic_score = Number(item.artistic) * Number(detail.important_score)
            item.artistic_important_score = Number(detail.important_score)
            item.ceo_artistic_score = item.artistic_important_score * 15

            item.totalScore += item.artistic_score
            item.totalScoreCEO += item.ceo_artistic_score

          }else if (detail.element_name == "Social"){
            item.social_score = Number(item.social) * Number(detail.important_score)
            item.social_important_score = Number(detail.important_score)
            item.ceo_social_score = item.social_important_score * 15

            item.totalScore += item.social_score
            item.totalScoreCEO += item.ceo_social_score
              
          }else if (detail.element_name == "Enterprising"){
            item.enterprising_score = Number(item.enterprising) * Number(detail.important_score)
            item.enterprising_important_score = Number(detail.important_score)
            item.ceo_enterprising_score = item.enterprising_important_score * 15

            item.totalScore += item.enterprising_score
            item.totalScoreCEO += item.ceo_enterprising_score
              
          }else if (detail.element_name == "Conventional"){
            item.conventional_score = Number(item.conventional) * Number(detail.important_score)
            item.conventional_important_score = Number(detail.important_score)
            item.ceo_conventional_score = item.conventional_important_score * 15

            item.totalScore += item.conventional_score
            item.totalScoreCEO += item.ceo_conventional_score

          }
        }
        if(item.total_last_score_work_activities === 'NaN'){
          item.total_last_score_work_activities = 0
        }
        item.total_percen = ((((item.totalScore/item.totalScoreCEO) /2)*100)+Number(item.total_last_score_work_activities)).toFixed(2)
    }
  }

  jobs_student.sort(function(a, b ) {
      return  b.total_percen - a.total_percen;
  });

  return jobs_student

};

export const sort_jobs5 = async () => {
  let res = await getReport1()
  let interest = await getInterest()
  let jobs_student = interest.job

  let jobs_task = await getJobtask()
  let jobs_knowledge = await getJobknowlage()

  let jobs_activities = await getJobactivities()
  let jobs_skill = await getJobskill()
  let jobs_abilitie = await getJobabilitie()
  
  

  for(let index of jobs_student){
    index.jobs_task = []
    for(let item of jobs_task.data){
      if(index.o_net_soc == item.onet_code){
        index.jobs_task.push(item)
      }
    }

    index.jobs_knowledge = []
    for(let item of jobs_knowledge.data){
      if(index.jobs_eng == item.title){
        index.jobs_knowledge.push(item)
      }
    }

    index.jobs_activities = []
    for(let item of jobs_activities.data){
      if(index.jobs_eng == item.title){
        index.jobs_activities.push(item)
      }
    }

    index.jobs_skill = []
    for(let item of jobs_skill.data){
      if(index.o_net_soc == item.onet_code){
        index.jobs_skill.push(item)
      }
    }

    index.jobs_abilitie = []
    for(let item of jobs_abilitie.data){
      if(index.o_net_soc == item.onet_code){
        index.jobs_abilitie.push(item)
      }
    }

    index.artistic = res.point_interres.a_i_can ;
    index.conventional = res.point_interres.c_i_can ;
    index.enterprising = res.point_interres.e_i_can ;
    index.investigative = res.point_interres.i_i_can ;
    index.realistic = res.point_interres.r_i_can ;
    index.social = res.point_interres.s_i_can ;
    index.point_work_activities = res.point_work_activities.total_score

    index.work_values_achievement = res.point_work_values.achievement ;
    index.work_values_independence = res.point_work_values.independence ;
    index.work_values_recognition = res.point_work_values.recognition ;
    index.work_values_relationships = res.point_work_values.relationships ;
    index.work_values_support = res.point_work_values.support ;
    index.work_values_working_conditions = res.point_work_values.working_conditions ;

    index.interest = []
    for(let item of interest.data){
      if(item.onet_code == index.o_net_soc){
        index.interest.push(item)
      }
    }
  }

  for(let item of jobs_student){
      item.totalScore = 0
      item.totalScoreCEO = 0
      if(item.interest.length == 0){
        item.realistic_score = 0
        item.realistic_important_score = 0
        item.ceo_realistic_score = 0
        item.investigative_score = 0
        item.investigative_important_score = 0
        item.ceo_investigative_score = 0
        item.artistic_score = 0
        item.artistic_important_score = 0
        item.ceo_artistic_score = 0
        item.social_score = 0
        item.social_important_score = 0
        item.ceo_social_score = 0
        item.enterprising_score = 0
        item.enterprising_important_score = 0
        item.ceo_enterprising_score = 0
        item.conventional_score = 0
        item.conventional_important_score = 0
        item.ceo_conventional_score = 0

        item.totalScore += 0
        item.totalScoreCEO += 0

        item.total_percen = 0
        item.total_percen = 0

      }else{
        for(let detail of item.interest ){
          if(detail.element_name == "Realistic"){
            item.realistic_score = Number(item.realistic) * Number(detail.important_score)
            item.realistic_important_score = Number(detail.important_score)
            item.ceo_realistic_score = item.realistic_important_score * 15
            item.totalScore += item.realistic_score
            item.totalScoreCEO += item.ceo_realistic_score
          }else if (detail.element_name == "Investigative"){
            item.investigative_score = Number(item.investigative) * Number(detail.important_score)
            item.investigative_important_score = Number(detail.important_score)
            item.ceo_investigative_score = item.investigative_important_score * 15

            item.totalScore += item.investigative_score
            item.totalScoreCEO += item.ceo_investigative_score

          }else if (detail.element_name == "Artistic"){
            item.artistic_score = Number(item.artistic) * Number(detail.important_score)
            item.artistic_important_score = Number(detail.important_score)
            item.ceo_artistic_score = item.artistic_important_score * 15

            item.totalScore += item.artistic_score
            item.totalScoreCEO += item.ceo_artistic_score

          }else if (detail.element_name == "Social"){
            item.social_score = Number(item.social) * Number(detail.important_score)
            item.social_important_score = Number(detail.important_score)
            item.ceo_social_score = item.social_important_score * 15

            item.totalScore += item.social_score
            item.totalScoreCEO += item.ceo_social_score
              
          }else if (detail.element_name == "Enterprising"){
            item.enterprising_score = Number(item.enterprising) * Number(detail.important_score)
            item.enterprising_important_score = Number(detail.important_score)
            item.ceo_enterprising_score = item.enterprising_important_score * 15

            item.totalScore += item.enterprising_score
            item.totalScoreCEO += item.ceo_enterprising_score
              
          }else if (detail.element_name == "Conventional"){
            item.conventional_score = Number(item.conventional) * Number(detail.important_score)
            item.conventional_important_score = Number(detail.important_score)
            item.ceo_conventional_score = item.conventional_important_score * 15

            item.totalScore += item.conventional_score
            item.totalScoreCEO += item.ceo_conventional_score
          }
        }
        item.total_percen = ((((item.totalScore/item.totalScoreCEO) /2)*100)).toFixed(2)
    }
  }

  jobs_student.sort(function(a, b ) {
      return  b.total_percen - a.total_percen;
  });

  return jobs_student
}